//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

import React            from 'react';
import ReactDOM         from 'react-dom';
import {
  Modal, Button, Glyphicon
}                       from 'react-bootstrap';
import _                from 'lodash';
import classNames       from 'classnames';
import Game             from './game';
import { PIECE_CHARS }  from './pieces';
import getSizes         from './sizes'; 

const initializeGame = () => {
  // Game is set globally by window.game, because we want
  // our algorithms to be fully accessible from your browser /DevTools/
  window.game = new Game();

  // Initialize the pawns:
  for (var i = 0; i < 8; i++) {
    game.piece('pawn', i, 6, 'W');
    game.piece('pawn', i, 1, 'B');
  }
  
  // Initialize the black figs:
  game.piece('rook', 0, 0, 'B');
  game.piece('knight', 1, 0, 'B');
  game.piece('bishop', 2, 0, 'B');
  game.piece('queen', 3, 0, 'B');
  game.piece('king', 4, 0, 'B');
  game.piece('bishop', 5, 0, 'B');
  game.piece('knight', 6, 0, 'B');
  game.piece('rook', 7, 0, 'B');
  
  // Initialize the white figs:
  game.piece('rook', 0, 7, 'W');
  game.piece('knight', 1, 7, 'W');
  game.piece('bishop', 2, 7, 'W');
  game.piece('queen', 3, 7, 'W');
  game.piece('king', 4, 7, 'W');
  game.piece('bishop', 5, 7, 'W');
  game.piece('knight', 6, 7, 'W');
  game.piece('rook', 7, 7, 'W');
}

initializeGame();

class MainComponent extends React.Component {
  constructor () {
    super();
    // bind the handle functions
    _.bindAll(this,
      '__handlePromotion',
      '__handleGamePromotion',
      '__handleCheckmate',
      '__handleReplay'
    );

    this.state = {
      selected: null,
      promotionParams: null,
      checkmate: null,
      welcomeDialog: true,
      playAgainstAI: false,
      settingsDialog: false,
      rotated: false,
      sizes: getSizes()
    };
  }

  componentDidMount(){
    // onResize event used to optimize the table sizes
    window.onresize = () => {
      this.setState({ sizes: getSizes() });
    };
  }

  __handleReplay() {
    this.setState({
      selected: null,
      promotionParams: null,
      welcomeDialog: true,
      checkmate: null,
      settingsDialog: false,
      playAgainstAI: false,
      rotated: false
    });
    
    if (AdMob) {
      AdMob.hideBanner();
      AdMob.showInterstitial();
    }
    initializeGame();
  }

  __handleClick (x, y) {
    var selected = this.state.selected;
    if (this.state.selected) {
      game.moveSelected(
        this.state.selected, {x: x, y: y}, this.__handlePromotion, this.__handleCheckmate, this.state.playAgainstAI
      );
      this.setState({selected: null })
    }else{
      var last = game.turn.length - 1;
      if (
        game.board[y][x] && 
        (last >= 0 ? game.board[y][x].color !== game.turn[last].color :
        game.board[y][x].color === "W")
      ) {
        this.setState({ selected: game.board[y][x] });
      }else{
        game.board[y][x] && alert("Invalid Move!");
      }
    }
  }
  
  __handleCheckmate(color){
    this.setState({ checkmate: color });
  }

  __handlePromotion (pawn, x, y, color) {
    this.setState({
      promotionParams: {
        x: x,
        y: y,
        color: color,
        pawn: pawn
      }
    });
  }

  __handleGamePromotion (piece) {
    if (piece){
      const { x, y, color, pawn } = this.state.promotionParams;
      game.promotePawn(pawn, x, y, color, piece);
    }
    this.setState({ promotionParams: null });
  }

  __renderTable () {
    const { selected, rotated } = this.state;
    const validMoves = selected && selected.getValidMoves(true);
    return game.board.map((rank, i) => (
      <tr key={i}>
        {
          rank.map((piece, j) => (
            <td key={j}
              onClick={this.__handleClick.bind(this, j, i)}
              className={classNames({
                selected: selected && selected === piece,
                validMoves: selected && _.find(validMoves, { x: j, y: i }),
                rotated: rotated && piece && piece.color === 'B'
              })}
            >
              {piece && piece.char}
            </td>            
          ))
        }
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <span
          className="menu-icon"
          onClick={() => {
            this.setState({ settingsDialog: true })
            if(AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
          }}
        >
          <Glyphicon glyph="cog" />
        </span>

        <table id={"table"} style={{...this.state.sizes}}>
          <tbody>
            {this.__renderTable()}
          </tbody>
        </table>

        { this.state.promotionParams && this.__renderPromotionDialog() }
        { this.state.settingsDialog && this.__renderSettings() }
        { this.state.checkmate && this.__renderCheckmateDialog() }
        { this.__renderWelcomeDialog() }
      </div>
    );
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
            this.setState({ playAgainstAI: true, welcomeDialog: false })
          }}>Easy {/*2*/}</Button>{` `}
          <Button bsSize='small' disabled>Medium {/*3*/}</Button>{` `}
          <Button bsSize='small' disabled>Hard {/*4*/}</Button>{` `}
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
    );
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
              <Button bsSize="large" key={i} onClick={this.__handleGamePromotion.bind(this, piece)}>
                {PIECE_CHARS[piece][this.state.promotionParams.color]}
              </Button>
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.__handleGamePromotion.bind(this, false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  __renderSettings () {
    const { settingsDialog } = this.state;
    const A = this.A;

    return (
      <Modal
        show={settingsDialog}
        onHide={() => {
          this.setState({ settingsDialog: false });
          if(AdMob) AdMob.hideBanner();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'left' }}>
          <ul>
            <li>
              <Button
                bsSize="small"
                onClick={() => { this.setState({ rotated: !this.state.rotated }) }}
              >
                rotate the black pieces / restore the rotation
              </Button> for real board experience.
            </li>
            <li>
              <Button
                bsSize="small"
                style={{ marginTop: '3px' }}
                onClick={this.__handleReplay}
              >New game /Click to select mode/</Button>
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
            this.setState({ settingsDialog: false });
            if(AdMob) AdMob.hideBanner();
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  __renderCheckmateDialog () {
    const { checkmate } = this.state;

    return (
      <Modal show={!!checkmate}>
        <Modal.Header closeButton>
          <Modal.Title>{ checkmate === 'D' ? 'Stalemate!' : 'Checkmate!' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            checkmate !== 'D' ?
            `The ${ checkmate === 'W' ? 'black' : 'white'}  player won!` :
            'Draw!'
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.__handleReplay.bind(this)}>Replay</Button>
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

var app = document.getElementById('app');
ReactDOM.render(<MainComponent />, app);