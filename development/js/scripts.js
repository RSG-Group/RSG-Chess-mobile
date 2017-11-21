import React            from 'react';
import ReactDOM         from 'react-dom';
import {
  Modal, Button
}                       from 'react-bootstrap';
import _                from 'lodash';
import classNames       from 'classnames';
import infl             from 'inflection';
import Game             from './game';
import { PIECE_CHARS }  from './pieces';
import getSizes         from './sizes'; 

const initializeGame = () => {
  window.game = new Game();

  // Pawns:
  for (var i = 0; i < 8; i++) {
    game.piece('pawn', i, 6, 'W');
    game.piece('pawn', i, 1, 'B');
  }

  // Black figs:
  game.piece('rook', 0, 0, 'B');
  game.piece('knight', 1, 0, 'B');
  game.piece('bishop', 2, 0, 'B');
  game.piece('queen', 3, 0, 'B');
  game.piece('king', 4, 0, 'B');
  game.piece('bishop', 5, 0, 'B');
  game.piece('knight', 6, 0, 'B');
  game.piece('rook', 7, 0, 'B');

  // White figs:
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

    _.bindAll(this,
      '__handlePromotion',
      '__handleGamePromotion',
      '__handleCheckmate'
    );

    this.state = {
      selected: null,
      promotionParams: null,
      checkmate: null,
      welcomeDialog: true,
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
    this.setState({ checkmate: null });
    initializeGame();
  }

  __handleClick (x, y) {
    var selected = this.state.selected;
    if (this.state.selected) {
      game.moveSelected(this.state.selected, {x: x, y: y}, this.__handlePromotion, this.__handleCheckmate);
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
    if(AdMob) AdMob.showInterstitial();
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
        <table id={"table"} style={{...this.state.sizes}}>
          <tbody>
            {this.__renderTable()}
          </tbody>
        </table>
        { this.state.promotionParams && this.__renderPromotionDialog() }
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
          Welcome to RSG Chess! <br />
          Cool chess game for everyone. Challenge your friends and have fun!
          <br /><br />
          How to play?
          <ul>
            <li>
              Singleplayer - Play with your opponent on YOUR device.
              <ul>
                <li>Like real chess board - Place your device horizontally on the surface,
                <b
                  style={{cursor: 'pointer'}}
                  onClick={() => { this.setState({rotated: true}) }}
                > click here to rotate the black figures </b> 
                and feel like playing on real chess board.</li>
              </ul>
            </li>
            <li>Multiplayer - Coming soon...</li>
            <li>Play VS computer - Coming in the next bigger release.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              this.setState({ welcomeDialog: false })
            }}
          >Let's start!</Button>
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

  __renderCheckmateDialog () {
    return (
      <Modal
        show={!!this.state.checkmate}
        onHide={this.__handleReplay.bind(this)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Checkmate!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The { this.state.checkmate === 'W' ? 'black' : 'white' } player won!
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.__handleReplay.bind(this)}>Replay</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

var app = document.getElementById('app');
ReactDOM.render(<MainComponent />, app);