import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Peer from 'peerjs';
import $ from "jquery";

//=========================
// TICTACTOE react code
//========================

class Square extends React.Component {
    render() {
	return (
	    <button className="square"
		    onClick={() => this.props.onClick()}
	    >
		{this.props.value}
	    </button>
	);
    }
}

class Board extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    squares: Array(9).fill(null),
	    xIsNext: true,
	};
    }

    handleClick(i) {
	const squares = this.state.squares.slice();
	if (calculateWinner(squares) || squares[i]) {
	    return;
	}
	squares[i] = this.state.xIsNext ? 'X' : 'O';
	this.setState({
	    squares: squares,
	    xIsNext: !this.state.xIsNext,
	});
    }
    
    renderSquare(i) {
	return <Square
		   value={this.state.squares[i]}
		   onClick={() => this.handleClick(i)}
	       />;
    }

    render() {
	const winner = calculateWinner(this.state.squares);
	let status;
	if (winner) {
	    status = 'Winner: ' + winner;
	} else {
	    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
	}

	return (
	    <div>
		<div className="status">{status}</div>
		<div className="board-row">
		    {this.renderSquare(0)}
		    {this.renderSquare(1)}
		    {this.renderSquare(2)}
		</div>
		<div className="board-row">
		    {this.renderSquare(3)}
		    {this.renderSquare(4)}
		    {this.renderSquare(5)}
		</div>
		<div className="board-row">
		    {this.renderSquare(6)}
		    {this.renderSquare(7)}
		    {this.renderSquare(8)}
		</div>
	    </div>
	);
    }
}

class Game extends React.Component {
    render() {
	return (
	    <div className="game">
		<div className="game-board">
		    <Board />
		</div>
		<div className="game-info">
		    <div>{/* status */}</div>
		    <ol>{/* TODO */}</ol>
		</div>
	    </div>
	);
    }
}

class Screen extends React.Component {

    constructor(props) {
	super(props);
	this.state = {value: ''};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
	alert('A name was submitted: ' + this.state.value);
	connectToPartner(this.state.value);
	event.preventDefault();
    }


    handleChange(event) {
	this.setState({value: event.target.value});
    }
    render() {
	return (
	    <div className = "screen" >
		<Game/>
		<div className = "chat">
		    <input id="peerid"/><br/>

		    <form onSubmit={this.handleSubmit}>
			<label>
			    Name:
			    <input type="text" value={this.state.value} onChange={this.handleChange} />
			</label>
			<input type="submit" value="Submit" />
		    </form>

		</div>
	    </div>
	);
    }
}


// ========================================



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Screen />);

// ========================================
// auxiliary functions


function calculateWinner(squares) {
    const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
	const [a, b, c] = lines[i];
	if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	    return squares[a];
	}
    }
    return null;
}

//=========================
// End of REACT code
//========================


// Peer js handler code

// peer declarations
const local = new Peer();
var incomingConnection = undefined;
var outgoingConnection = undefined;

local.on("open", (id) => {
    document.getElementById("peerid").value = id;
});

local.on("connection", (otroconn) => {
    alert("connection successful");
    otroconn.on('open', function() {
	if (outgoingConnection == undefined) {
	    outgoingConnection = local.connect(otroconn.peer);
	}
    });
    otroconn.on('data', function(data) {
	alert("messaged received");
	//        postMessageReceived(data);
    });
    incomingConnection = otroconn;
});

function connectToPartner(id) {
    outgoingConnection = local.connect(id);
}
