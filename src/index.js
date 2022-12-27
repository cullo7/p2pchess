import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Peer from 'peerjs';
import $ from "jquery";
/*

// Jquery for chat functionality

function postMessageReceived(message) {
//    $(".chat").append(
//	"<div class='receiver message'>" + message + " </div>"
//  );
alert("msg received");
}

function postMessageSent(message) {
//    $(".chat").append(
//	"<div class='sender message'>" + message + " </div>"
//  );
alert("msg sent");
}

*/


// peer declarations
const local = new Peer();
var incomingConnection = undefined;
var outgoingConnection = undefined;

local.on("open", (id) => {
    document.getElementById("peerid").value = id;
});

local.on("connection", (otroconn) => {
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

function sendMessage(s) {
    if (outgoingConnection == undefined) {
    } else {
	outgoingConnection.send(s);
	alert("message sent");
	//	postMessageSent(s);
    }
}
/*
  var input = document.getElementById("message");
  input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
  if (input.value != "") {
  sendMessage(input.value);
  input.value = "";
  }
  }
  });

  var otroIp = document.getElementById("otropeerid");
  otroIp.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
  if (otroIp.value != "") {
  outgoingConnection = local.connect(otroIp.value);
  } else {
  alert("no IP provided");
  }
  }
  });
*/
/*
  window.setInterval(function() {
  var elem = document.getElementById('chat');
  elem.scrollTop = elem.scrollHeight;
  }, 500);
*/

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
    render() {
	return (
	    <div className = "screen" >
		<Game/>
		<div className = "chat">
		    <form>
			<label>
			    Name:
			    <input type="text" name="name" />
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
