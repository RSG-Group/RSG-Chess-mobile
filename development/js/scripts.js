//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

import React from 'react'
import ReactDOM from 'react-dom'
import {
  Modal, Button, Glyphicon, Checkbox, FormGroup, ControlLabel, FormControl, PageHeader
} from 'react-bootstrap'
import _ from 'lodash'
import classNames from 'classnames'
import { Game, Piece } from 'rsg-chess'
import Graphics from 'rsg-chess-graphics'
import getSizes from './sizes'

let palettes = [
  {
    id: 1,
    name: 'RSG Chess standard',
    background: 'rgb(240, 220, 180)',
    props: {
      whiteCells: 'rgb(255, 205, 160)',
      blackCells: 'rgb(210, 140, 70)',
      validBG: 'red',
      selectedBG: 'brown',
      selectedColor: 'lightblue'
    }
  },
  {
    id: 2,
    name: 'Light blue ocean',
    background: 'rgb(220, 255, 245)',
    props: {
      whiteCells: 'rgb(225, 225, 225)',
      blackCells: 'rgb(110, 130, 180)',
      validBG: 'rgb(255, 100, 45)',
      selectedBG: 'rgb(155, 0, 0)',
      selectedColor: 'lightgreen'
    }
  },
  {
    id: 3,
    name: 'Chess.com green',
    background: 'rgb(235, 255, 205)',
    props: {
      whiteCells: 'rgb(240, 240, 210)',
      blackCells: 'rgb(120, 150, 85)',
      validBG: 'rgb(255, 253, 158)',
      selectedBG: 'rgb(70, 0, 165)',
      selectedColor: 'rgb(255, 255, 155)'
    }
  },
  {
    id: 4,
    name: 'Sweety',
    background: 'rgb(255, 245, 225)',
    props: {
      whiteCells: 'rgb(255, 215, 215)',
      blackCells: 'rgb(230, 110, 110)',
      validBG: 'rgb(70, 0, 165)',
      selectedBG: 'rgb(185, 75, 0)',
      selectedColor: 'rgb(135, 255, 235)'
    }
  }
]

let game
const initializeGame = () => {
  game = Game.prototype.initializeGame()
}

initializeGame()

class MainComponent extends React.Component {
  constructor () {
    super()
    // bind the handle functions
    _.bindAll(this,
      '__handlePromotion',
      '__handleGamePromotion',
      '__handleCheckmate',
      '__handleReplay',
      '__handleSetPalette'
    )

    this.state = {
      selected: null,
      promotionParams: null,
      checkmate: null,
      welcomeDialog: true,
      settingsDialog: false,
      playAgainstAI: false,
      rotated: false,
      showValidMoves: true,
      palette: palettes[0],
      sizes: getSizes()
    }
  }

  componentDidMount () {
    // onResize event used to optimize the table sizes
    window.onresize = () => {
      this.setState({ sizes: getSizes() })
    }
    document.querySelector('body').style.background = this.state.palette.background
  }

  __handleReplay () {
    // Set state to null and false, to reset all params
    this.setState({
      selected: null,
      promotionParams: null,
      welcomeDialog: true,
      checkmate: null,
      settingsDialog: false,
      playAgainstAI: false
    })

    if (AdMob) {
      AdMob.hideBanner()
      AdMob.showInterstitial()
    }

    // Initialize new game
    initializeGame()
  }

  __handleClick (x, y) {
    var selected = this.state.selected
    if (selected) {
      game.moveSelected(
        selected, {x: x, y: y}, this.__handlePromotion, this.__handleCheckmate, this.state.playAgainstAI, false
      )
      this.setState({ selected: null })
    } else {
      var last = game.turn.length - 1
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

  __handlePromotion (pawn, x, y, color) {
    this.setState({
      promotionParams: {
        x: x,
        y: y,
        color: color,
        pawn: pawn
      }
    })
  }

  __handleCheckmate (color) {
    this.setState({ checkmate: color })
  }

  __handleGamePromotion (piece) {
    if (piece) {
      const { x, y, color, pawn } = this.state.promotionParams
      game.promotePawn(pawn, x, y, color, piece)
    }
    this.setState({ promotionParams: null })
  }

  __handleSetPalette (ev) {
    const currentPalette = _.find(palettes, { id: Number(ev.target.value) })
    document.querySelector('body').style.background = currentPalette.background
    this.setState({
      palette: currentPalette
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
    return (
      <Modal
        show={this.state.welcomeDialog}
        onHide={() => { this.setState({ welcomeDialog: false }) }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome</Modal.Title>
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
                {Piece.PIECE_CHARS[piece][this.state.promotionParams.color]}
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
    const { settingsDialog } = this.state

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
              <b><a href="https://rsg-chess.now.sh/docs/mobile">
                Check out all color palettes to select the best one for you on our website!
              </a></b>
            </li>
            <li>
              <a href="https://github.com/RSG-Group/Chess/blob/master/LICENSE" target="_blank">License</a>{`, `}
              <a href="https://github.com/RSG-Group/Chess" target="_blank">Source code</a>; <a href="https://en.wikipedia.org/wiki/Rules_of_chess" target="_blank">Learn Chess</a>
            </li>
            <li>
              <a href="https://github.com/RSG-Group/Chess/issues" target="_blank">Report a problem</a>{` `}
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
          <Button onClick={this.__handleReplay.bind(this)}>Replay</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

var app = document.getElementById('app')
ReactDOM.render(<MainComponent />, app)
