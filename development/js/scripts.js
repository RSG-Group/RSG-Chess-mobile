//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

// import es6 scripts
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Modal, Button, Glyphicon, Checkbox, FormGroup, ControlLabel, FormControl, PageHeader
} from 'react-bootstrap'
import _ from 'lodash'
import classNames from 'classnames'
import { Game, Pieces } from 'rsg-chess'
import Graphics from 'rsg-chess-graphics'
import { colorPalettes as palettes, strings } from './config'
import getSizes from './sizes'

// import a web worker for AI calculations.
var worker = new Worker('src/worker.min.js')

// initialize game
let game
const initializeGame = () => {
  game = Game.prototype.initializeGame()
}

initializeGame()

class MainComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      selected: null,
      promotionParams: null,
      checkmate: null,
      welcomeDialog: true,
      settingsDialog: false,
      isAIThinking: false,
      playAgainstAI: null,
      rotated: false,
      showValidMoves: true,
      palette: palettes[0],
      sizes: getSizes(),
      lang: 'en'
    }

    // set up a web worker for AI
    const promoteAI = (pawn, x, y, color) => {
      game.promotePawn(pawn, x, y, color, 'queen')
    }
    worker.addEventListener('message', (e) => {
      if (e.data !== null) {
        game.moveSelected(game.board[e.data.from.y][e.data.from.x], e.data.to, promoteAI, this.__handleCheckmate, false)
        this.setState({ isAIThinking: false })
      }
    })
  }

  componentDidMount () {
    document.querySelector('body').style.background = this.state.palette.background

    // onResize event used to optimize the table sizes
    window.onresize = () => {
      this.setState({ sizes: getSizes() })
    }

    window.onload = () => {
      navigator.globalization.getPreferredLanguage((language) => {
        if (language && typeof language === 'object') {
          let lang = language.value.split(/\s*-\s*/g)[0]
          // let locale = language.value.split(/\s*-\s*/g)[1]
          this.setState({ lang })
        }
      })
    }
  }

  __handleReplay = () => {
    // Set state to null and false, to reset all params
    this.setState({
      selected: null,
      promotionParams: null,
      welcomeDialog: true,
      checkmate: null,
      settingsDialog: false,
      isAIThinking: false,
      playAgainstAI: null
    })

    if (AdMob) {
      AdMob.hideBanner()
      AdMob.showInterstitial()
    }

    // Initialize new game
    initializeGame()
  }

  __handleClick (x, y) {
    let { selected, playAgainstAI, isAIThinking } = this.state

    if (isAIThinking) {
      if (window.plugins && window.plugins.toast) {
        window.plugins.toast.show('Plase wait while our AI is thinking...', '1750', 'bottom')
      }
      return
    }

    if (selected) {
      // move the selected piece
      let moved = game.moveSelected(
        selected, {x: x, y: y}, this.__handlePromotion, this.__handleCheckmate, fals=> e
      )
      this.setState({ selected: null })

      // use the worker for generating AI movement
      let last = game.turn.length - 1
      if (moved && playAgainstAI && last >= 0 && game.turn[last].color === 'W') {
        worker.postMessage({ game, playAgainstAI })
        this.setState({ isAIThinking: true })
      }
    } else {
      let last = game.turn.length - 1
      if (
        game.board[y][x] &&
        (last >= 0 ? game.board[y][x].color !== game.turn[last].color
          : game.board[y][x].color === 'W')
      ) {
        this.setState({ selected: game.board[y][x] })
      } else {
        game.board[y][x] && alert('Invalid Move!')
      }
    }
  }

  __handlePromotion = (pawn, x, y, color) => {
    this.setState({
      promotionParams: {
        x: x,
        y: y,
        color: color,
        pawn: pawn
      }
    })
  }

  __handleCheckmate = (color) => {
    this.setState({ checkmate: color })
  }

  __handleGamePromotion = (piece) => {
    if (piece) {
      const { x, y, color, pawn } = this.state.promotionParams
      game.promotePawn(pawn, x, y, color, piece)
    }
    this.setState({ promotionParams: null })
  }

  __handleSetPalette = (ev) => {
    const currentPalette = _.find(palettes, { id: Number(ev.target.value) })
    document.querySelector('body').style.background = currentPalette.background
    this.setState({
      palette: currentPalette
    })
  }

  __handleSetPalette = (ev) => {
    this.setState({
      lang: ev.target.value
    })
  }

  render () {
    const { selected, rotated, showValidMoves } = this.state
    return (
      <div>
        <span
          className="menu-icon"
          onClick={() => {
            this.setState({ settingsDialog: true })
            if (AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER)
          }}>
          <Glyphicon glyph="cog" />
        </span>

        <Graphics
          self={this}
          board={game.board}
          rotated={rotated}
          selected={selected}
          showValidMoves={showValidMoves}
          onClick={this.__handleClick}
          style={{...this.state.sizes}}
          {...this.state.palette.props}
          id="table"
        />

        { this.state.promotionParams && this.__renderPromotionDialog() }
        { this.state.settingsDialog && this.__renderSettings() }
        { this.state.checkmate && this.__renderCheckmateDialog() }
        { this.__renderWelcomeDialog() }
      </div>
    )
  }

  __renderWelcomeDialog () {
    const { lang } = this.state
    return (
      <Modal
        show={this.state.welcomeDialog}
        onHide={() => { this.setState({ welcomeDialog: false }) }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{strings.welcomeTitle[lang]}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'left' }}>
          Select play mode: <br />
          Play VS computer{` `}
          <Button bsSize='small' onClick={() => {
            this.setState({ playAgainstAI: { depth: 2 }, welcomeDialog: false })
          }}>Easy</Button>{` `}
          <Button bsSize='small' onClick={() => {
            this.setState({ playAgainstAI: { depth: 4 }, welcomeDialog: false })
          }}>Medium</Button>{` `}
          <Button bsSize='small' disabled>Hard</Button>{` `}
          <br/><br/>
          or <Button
            bsSize='small'
            onClick={() => {
              this.setState({ welcomeDialog: false })
            }}
          >start singleplayer</Button>
          <ul>
            <li>Place your device horizontally on the surface and {` `}
              <b style={{cursor: 'pointer'}} onClick={() => { this.setState({rotated: !this.state.rotated}) }}>
              click here to rotate {this.state.rotated && 'back'} the black figures for real board experience
              </b></li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              this.setState({ welcomeDialog: false })
            }}
          >Let's start singleplayer!</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  __renderPromotionDialog () {
    return (
      <Modal show={!!this.state.promotionParams} onHide={this.__handleGamePromotion.bind(this, false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a piece to promote to</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            ['queen', 'rook', 'bishop', 'knight'].map((piece, i) => (
              <Button
                onClick={this.__handleGamePromotion.bind(this, piece)}
                className="pfigs"
                bsSize="large"
                key={i}
              >
                {Pieces.PIECE_CHARS[piece][this.state.promotionParams.color]}
              </Button>
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.__handleGamePromotion.bind(this, false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  __renderSettings () {
    const { settingsDialog, lang } = this.state
    const A = this.A

    return (
      <Modal
        show={settingsDialog}
        onHide={() => {
          this.setState({ settingsDialog: false })
          if (AdMob) AdMob.hideBanner()
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'left' }}>
          <ul>
            <li>
              <Checkbox
                checked={this.state.rotated}
                className="no-selection"
                onChange={() => {
                  this.setState({ rotated: !this.state.rotated })
                }}
              >
                Rotate the black figures (or restore the rotation)
                for real board experience.
              </Checkbox>
            </li>
            <li>
              <Button
                bsSize="small"
                style={{ marginTop: '3px' }}
                onClick={this.__handleReplay}
              >New game</Button> (Start a new game first and then select game mode)
            </li>
            <li>
              <Checkbox
                checked={this.state.showValidMoves}
                className="no-selection"
                onChange={() => {
                  this.setState({showValidMoves: !this.state.showValidMoves})
                }}
              >Show the valid moves on the board</Checkbox>
            </li>
            <li>
              <FormGroup controlId="paletteSelect">
                <ControlLabel>Select a color palette:</ControlLabel>
                <FormControl onChange={this.__handleSetPalette} defaultValue={this.state.palette.id} componentClass="select">
                  {
                    palettes.map((ev, i) => (
                      <option key={i} value={ev.id}>{ev.name}</option>
                    ))
                  }
                </FormControl>
              </FormGroup>
              <b><A href="https://rsg-chess.now.sh/docs/mobile/palettes" target="_blank">
                Check out all color palettes to select the best one for you on our website!
              </A></b>
            </li>
            <li>
              <FormGroup controlId="languageSelect">
                <ControlLabel>Select a language</ControlLabel>
                <FormControl onChange={this.__handleSetPalette} defaultValue={this.state.lang} componentClass="select">
                  {
                    Object.keys(strings.languages[lang]).map((ev, i) => {
                      return <option key={i} value={ev}>{strings.languages[lang][ev]}</option>
                    })
                  }
                </FormControl>
              </FormGroup>
              <b><A href="https://rsg-chess.now.sh/docs/mobile/palettes" target="_blank">
                Check out all color palettes to select the best one for you on our website!
              </A></b>
            </li>
            <li>
              <A href="https://github.com/RSG-Group/Chess/blob/master/LICENSE" target="_blank">License</A>{`, `}
              <A href="https://github.com/RSG-Group/Chess" target="_blank">Source code</A>; <A href="https://en.wikipedia.org/wiki/Rules_of_chess" target="_blank">Learn Chess</A>
            </li>
            <li>
              <A href="https://github.com/RSG-Group/Chess/issues" target="_blank">Report a problem</A>{` `}
              or contact us on <i>rsg.group.here@gmail.com</i>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            this.setState({ settingsDialog: false })
            if (AdMob) AdMob.hideBanner()
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  __renderCheckmateDialog () {
    const { checkmate } = this.state

    return (
      <Modal show={!!checkmate}>
        <Modal.Header>
          <Modal.Title>{ checkmate === 'D' ? 'Stalemate!' : 'Checkmate!' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            checkmate !== 'D'
              ? `The ${checkmate === 'W' ? 'black' : 'white'}  player won!`
              : 'Draw!'
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.__handleReplay}>Replay</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  A (props) {
    return (
      <a href='#' onClick={() => { window.open(props.href, '_system') }}>
        {props.children}
      </a>
    )
  }
}

var app = document.getElementById('app')
ReactDOM.render(<MainComponent />, app)
