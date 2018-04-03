//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

import React from 'react'
import ReactDOM from 'react-dom'
import {
  Modal, Button, Glyphicon, Checkbox
} from 'react-bootstrap'
import _ from 'lodash'
import classNames from 'classnames'
import { Game, Piece } from 'rsg-chess'
import Graphics from 'rsg-chess-graphics'
import getSizes from './sizes'

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
      '__handleReplay'
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
      sizes: getSizes()
    };
  }

  componentDidMount(){
    // onResize event used to optimize the table sizes
    window.onresize = () => {
      this.setState({ sizes: getSizes() });
    };
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
      AdMob.hideBanner();
      AdMob.showInterstitial();
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

  render () {
    const { selected, rotated, showValidMoves } = this.state
    const validMoves = selected && selected.getValidMoves(true)
    return (
      <div>
        <span
          className="menu-icon"
          onClick={() => {
            this.setState({ settingsDialog: true })
            if(AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
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
          if(AdMob) AdMob.hideBanner();  
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
            if(AdMob) AdMob.hideBanner();
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
