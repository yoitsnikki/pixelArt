/*
Nikki Agrawal
Matthew Hesby
Web Development
Coding a Pixel Art Game

Color Picker Code:
https://casesandberg.github.io/react-color/
https://www.npmjs.com/package/react-circle-color-picker

Dropdown Code:
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown

NOTES:
The dropdown menu is not complete yet. I will work on it during break, but I did not have enough time.
The New Game Button is only partially working. It makes a new board, but doesn't PUT something in the database.
This isn't bad for my score because I have to either PUT or POST, and I POST in the save button function.
*/

// import my different programs
import React from 'react';
import './App.css';
import ReactCircleColorPicker from 'react-circle-color-picker'

// my database of colors for coloring with, not in the state because there is no need to save or change it, it's a constant
let colorDatabase = [
  { hex: '#FF0000', selected: false },
  { hex: '#FFA000', selected: false },
  { hex: '#FFDD00', selected: false },
  { hex: '#FFFF00', selected: false },
  { hex: '#59FF00', selected: false },
  { hex: '#3EB300', selected: false },
  { hex: '#03FFA2', selected: false },
  { hex: '#03FFF7', selected: false },
  { hex: '#03C0FF', selected: false },
  { hex: '#0000FF', selected: false },
  { hex: '#9D00FF', selected: false },
  { hex: '#FF00E0', selected: false },
  { hex: '#FFFFFF', selected: false },
  { hex: '#000000', selected: false },
];

// to make the colored circles for coloring in
function ColorComponent(props) {
  return (
    <ReactCircleColorPicker colors={[props.value]}/>
  )
}

// make the buttons on the grid
function Square(props) {
  return (
    <button className='square' onClick={props.onClick} style={{backgroundColor: props.value}}></button>
  );
}

// the save button for saving the artwork
function Save(props) {
  return (
    <button className="save" onClick={props.onClick}> Save Art </button>
  )
}

// button for making a new game/board for coloring on
function NewGame(props) {
  return (
    <button className="new-game" onClick={props.onClick}> New Art </button>
  )
}

// button for dropdown menu to look at previous artwork
function Dropdown(props) {
  return (
    <div className="dropdown">
      <button onClick={props.onClick} className="drop-button"> Previous Art </button>
      <div id="myDropdown" className="dropdown-content">
        <button onClick={props.onClick}> Art 1 </button>
      </div>
    </div>
  )
}

function addButton() {
  // if new game button pressed, then add a button to the dropdown content
}

// my main coloring board, where pretty much everything is run
class Board extends React.Component {
  constructor(props) {
    super(props);

    // what the state is
    this.state = {
      game: 1,
      squares: Array(225).fill(null),
      selected: '#FFFFFF'
    };
  }

  // sets the state to what is in the database for default get
  callAPI() {
    fetch('http://localhost:8000/testAPI')
    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      console.log("res", res)
      this.setState({
        game: res[0].game,
        squares: res[0].squares,
        selected: res[0].selected,
      })
    })
    .catch(err => err)
    console.log(this.state)
  }

  // if component mounts, run call API and get my database
  componentDidMount() {
    this.callAPI();
  }

  // what happens when I click on one of the squares, run for the square button
  handleClick(i) {
    // takes the state and makes them consts to work with
    const squares = this.state.squares.slice();
    const colors = colorDatabase.slice();

    // makes a variable for figuring out which color is selected
    let colorSelected;

    // loops through colors to find out which one is selected
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].selected === true) {
        colorSelected = colors[i].hex;
        break;
      }
    }

    squares[i] = this.state.selected;

    // updates the state to be equal to whatever changes were made
    this.setState({
      game: this.state.game,
      squares: squares,
      selected: colorSelected
    });

  }

  // the function for what happens when the save button is pressed
  saveClick() {
    // everything is posted/saved to the database when SAVE is clicked
    console.log("starting post");

    fetch('http://localhost:8000/testAPI', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'game': this.state.game,
        'squares': this.state.squares,
        'selected': this.state.selected,
      })
    })
    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      console.log("res", res)
    })

    console.log("post done")
    console.log(this.state)
  }

  // makes a new game board for when new game is pressed
  newGameClick () {
    let game = this.state.game;
    game = game+1;
    console.log(game);

    // does a get and makes a new board
    console.log("making new game")
    fetch('http://localhost:8000/testAPI', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'game': game,
      })
    })
    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(res => {
      console.log("res", res)
      this.setState({
        game: res.game,
        squares: res.squares,
        selected: res.selected})
    })

    console.log(this.state)

    // run the newbutton function from the top to add stuff to dropdown

  }

  // runs what happens when the dropdown menu is pressed
  dropdownClick () {
    console.log("dropdown menu working")
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // how i make my different colors on my color bar
  makeColors(i) {
    return (
      <ColorComponent
        value={colorDatabase[i]}
      />
    )
  }

  // make the different squares of the color grid
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} // run handle click when clicked
        style={this.state.selected} // aka the CSS, or background color
      />
    );
  }

  // making my save button, runs saveClick
  renderSave() {
    return(
      <Save
        onClick={() => this.saveClick()}
      />
    )
  }

  // making my button for a new game
  renderNewGame() {
    return (
      <NewGame
        onClick={() => this.newGameClick()}
      />
    )
  }

  // making my dropdown menu to look at previous artworks
  renderDropdown() {
    return (
      <Dropdown
        onClick={() => this.dropdownClick()}
      />
    )
  }

  render() {
    // let status;
    let status;
    status = "Game: " + this.state.game;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="dropdown-menu">{this.renderDropdown()}</div>

        <div className="save-new-button">
          {this.renderSave()}
          {this.renderNewGame()}
        </div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>

        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
        </div>

        <div className="board-row">
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
        </div>

        <div className="board-row">
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
        </div>

        <div className="board-row">
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
          {this.renderSquare(64)}
          {this.renderSquare(65)}
          {this.renderSquare(66)}
          {this.renderSquare(67)}
          {this.renderSquare(68)}
          {this.renderSquare(69)}
          {this.renderSquare(70)}
          {this.renderSquare(71)}
          {this.renderSquare(72)}
          {this.renderSquare(73)}
          {this.renderSquare(74)}
        </div>

        <div className="board-row">
          {this.renderSquare(75)}
          {this.renderSquare(76)}
          {this.renderSquare(77)}
          {this.renderSquare(78)}
          {this.renderSquare(79)}
          {this.renderSquare(80)}
          {this.renderSquare(81)}
          {this.renderSquare(82)}
          {this.renderSquare(83)}
          {this.renderSquare(84)}
          {this.renderSquare(85)}
          {this.renderSquare(86)}
          {this.renderSquare(87)}
          {this.renderSquare(88)}
          {this.renderSquare(89)}
        </div>

        <div className="board-row">
          {this.renderSquare(90)}
          {this.renderSquare(91)}
          {this.renderSquare(92)}
          {this.renderSquare(93)}
          {this.renderSquare(94)}
          {this.renderSquare(95)}
          {this.renderSquare(96)}
          {this.renderSquare(97)}
          {this.renderSquare(98)}
          {this.renderSquare(99)}
          {this.renderSquare(100)}
          {this.renderSquare(101)}
          {this.renderSquare(102)}
          {this.renderSquare(103)}
          {this.renderSquare(104)}
        </div>

        <div className="board-row">
          {this.renderSquare(105)}
          {this.renderSquare(106)}
          {this.renderSquare(107)}
          {this.renderSquare(108)}
          {this.renderSquare(109)}
          {this.renderSquare(110)}
          {this.renderSquare(111)}
          {this.renderSquare(112)}
          {this.renderSquare(113)}
          {this.renderSquare(114)}
          {this.renderSquare(115)}
          {this.renderSquare(116)}
          {this.renderSquare(117)}
          {this.renderSquare(118)}
          {this.renderSquare(119)}
        </div>

        <div className="board-row">
          {this.renderSquare(120)}
          {this.renderSquare(121)}
          {this.renderSquare(122)}
          {this.renderSquare(123)}
          {this.renderSquare(124)}
          {this.renderSquare(125)}
          {this.renderSquare(126)}
          {this.renderSquare(127)}
          {this.renderSquare(128)}
          {this.renderSquare(129)}
          {this.renderSquare(130)}
          {this.renderSquare(131)}
          {this.renderSquare(132)}
          {this.renderSquare(133)}
          {this.renderSquare(134)}
        </div>

        <div className="board-row">
          {this.renderSquare(135)}
          {this.renderSquare(136)}
          {this.renderSquare(137)}
          {this.renderSquare(138)}
          {this.renderSquare(139)}
          {this.renderSquare(140)}
          {this.renderSquare(141)}
          {this.renderSquare(142)}
          {this.renderSquare(143)}
          {this.renderSquare(144)}
          {this.renderSquare(145)}
          {this.renderSquare(146)}
          {this.renderSquare(147)}
          {this.renderSquare(148)}
          {this.renderSquare(149)}
        </div>

        <div className="board-row">
          {this.renderSquare(150)}
          {this.renderSquare(151)}
          {this.renderSquare(152)}
          {this.renderSquare(153)}
          {this.renderSquare(154)}
          {this.renderSquare(155)}
          {this.renderSquare(156)}
          {this.renderSquare(157)}
          {this.renderSquare(158)}
          {this.renderSquare(159)}
          {this.renderSquare(160)}
          {this.renderSquare(161)}
          {this.renderSquare(162)}
          {this.renderSquare(163)}
          {this.renderSquare(164)}
        </div>

        <div className="board-row">
          {this.renderSquare(165)}
          {this.renderSquare(166)}
          {this.renderSquare(167)}
          {this.renderSquare(168)}
          {this.renderSquare(169)}
          {this.renderSquare(170)}
          {this.renderSquare(171)}
          {this.renderSquare(172)}
          {this.renderSquare(173)}
          {this.renderSquare(174)}
          {this.renderSquare(175)}
          {this.renderSquare(176)}
          {this.renderSquare(177)}
          {this.renderSquare(178)}
          {this.renderSquare(179)}
        </div>

        <div className="board-row">
          {this.renderSquare(180)}
          {this.renderSquare(181)}
          {this.renderSquare(182)}
          {this.renderSquare(183)}
          {this.renderSquare(184)}
          {this.renderSquare(185)}
          {this.renderSquare(186)}
          {this.renderSquare(187)}
          {this.renderSquare(188)}
          {this.renderSquare(189)}
          {this.renderSquare(190)}
          {this.renderSquare(191)}
          {this.renderSquare(192)}
          {this.renderSquare(193)}
          {this.renderSquare(194)}
        </div>

        <div className="board-row">
          {this.renderSquare(195)}
          {this.renderSquare(196)}
          {this.renderSquare(197)}
          {this.renderSquare(198)}
          {this.renderSquare(199)}
          {this.renderSquare(200)}
          {this.renderSquare(201)}
          {this.renderSquare(202)}
          {this.renderSquare(203)}
          {this.renderSquare(204)}
          {this.renderSquare(205)}
          {this.renderSquare(206)}
          {this.renderSquare(207)}
          {this.renderSquare(208)}
          {this.renderSquare(209)}
        </div>

        <div className="board-row">
          {this.renderSquare(210)}
          {this.renderSquare(211)}
          {this.renderSquare(212)}
          {this.renderSquare(213)}
          {this.renderSquare(214)}
          {this.renderSquare(215)}
          {this.renderSquare(216)}
          {this.renderSquare(217)}
          {this.renderSquare(218)}
          {this.renderSquare(219)}
          {this.renderSquare(220)}
          {this.renderSquare(221)}
          {this.renderSquare(222)}
          {this.renderSquare(223)}
          {this.renderSquare(224)}
        </div>

        <div className="color-picker">
          {this.makeColors(0)}
          {this.makeColors(1)}
          {this.makeColors(2)}
          {this.makeColors(3)}
          {this.makeColors(4)}
          {this.makeColors(5)}
          {this.makeColors(6)}
          {this.makeColors(7)}
          {this.makeColors(8)}
          {this.makeColors(9)}
          {this.makeColors(10)}
          {this.makeColors(11)}
          {this.makeColors(12)}
          {this.makeColors(13)}
        </div>

      </div>

    );
  }
}

// running the actual app overall in divs
class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="header">Pixel Art Coloring Game</div>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

// ========================================

export default App;
