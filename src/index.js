import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Peer from 'peerjs';
import $ from 'jquery';

// peer declarations
const local = new Peer();
var incomingConnection = undefined;
var outgoingConnection = undefined;

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
	    iAmNext: true,
	    playerId:0,
	    symbol: '',
	};

	// fix problems of calling this.handleClick from connection object(i think)

	var boardSelf = this;

	//code for handling p2p connection and data
	local.on("open", (id) => {
	    document.getElementById("peerid").value = id;
	});

	local.on("connection", (otroconn) => {
	    console.log("connection successful");
	    otroconn.on('open', function() {
		// upon receiving a connection we open an adjacent connection (outgoing)
		if (outgoingConnection == undefined) {
		    outgoingConnection = local.connect(otroconn.peer);
		    // after second connection
		} else {
		    boardSelf.startGame();
		}

	    });
	    otroconn.on('data', function(data) {
		//alert("data detected");
		//alert(data);
		console.log(data);
		if (data == "go second"){
		    console.log("go second read");
		    boardSelf.setState({
			iAmNext: false,
			playerId: 1,
			symbol: 'X',
		    });
		} else if (data == "go first") {
		    boardSelf.setState({
			playerId: 2,
			symbol: 'O',
			
		    });
		} else {
		    boardSelf.receiveClick(data);
		}
	    });
	    incomingConnection = otroconn;
	    otroconn.on('error', function(err) {
		    console.log(err);
	    });

	});

	local.on('error', function(err) {
	    console.log(err);
	});
    }

    startGame() {
	console.log("start game called");
	if (Math.random() * 2 > 1) {
	    this.setState({
		iAmNext: false,
		playerId: 1,
		symbol: 'X',
	    });
	    this.tryToSendMessage("go first");
	} else {
	    this.setState({
		playerId: 2,
		symbol: 'O',		
	    });
	    this.tryToSendMessage("go second");
	}
    }

    tryToSendMessage(message) {
	if (outgoingConnection == undefined) {
	    console.log("no connection to send message");
	} else {
	    outgoingConnection.send(message);
	}
    }

    receiveClick(i) {
	const squares = this.state.squares.slice();
	if (this.state.symbol == 'X') {
	    squares[i] = 'O';
	} else {
	    squares[i] = 'X';
	}
	this.setState({
	    squares: squares,
	    iAmNext: !this.state.iAmNext,
	});

    }	

    handleSendClick(i) {
	if(!this.sendClick(i)) {
	    return;
	}
	this.handleClick(i);
    }
    
    sendClick(i) {
	if (outgoingConnection == undefined) {
	    console.log("no connection established");
	    return;
	}
	const squares = this.state.squares.slice();
	if(!this.checkMove(squares, i)) {
	    console.log(" move not permitted");
	    return false;
	}
	outgoingConnection.send(i);
	return true;
    }

    checkMove(squares, i) {
	if (calculateWinner(squares) || squares[i] || !this.state.iAmNext) {
	    console.log(this.state.iAmNext);
	    return false;
	}
	return true;
    }

    handleClick(i) {
	const squares = this.state.squares.slice();
	if(!this.checkMove(squares, i)) {
	    console.log(" move not permitted");
	    return;
	}
	squares[i] = this.state.symbol;
	this.setState({
	    squares: squares,
	    iAmNext: !this.state.iAmNext,
	});
    }
    
    renderSquare(i) {
	return <Square
		   value={this.state.squares[i]}
		   onClick={() => this.handleSendClick(i)}
	       />;
    }

    render() {
	const winner = calculateWinner(this.state.squares);
	let status;
	let nextPlayer;
	if (winner) {
	    if (this.state.symbol == winner) {
		nextPlayer = this.state.playerId;
	    } else {
		if (this.state.playerId == 1) {
		    nextPlayer = 2;
		} else {
		    nextPlayer = 1;
		}
	    }
	    status = 'Winner: Player ' + nextPlayer;
	} else if (this.state.playerId == 0) {
	    status = "New game";
	} else {
	    if (this.state.iAmNext) {
		nextPlayer = this.state.playerId;
	    } else {
		if (this.state.playerId == 1) {
		    nextPlayer = 2;
		} else {
		    nextPlayer = 1;
		}
	    }
	    status = 'Player ' + nextPlayer + ' it is your turn';
	}

	return (
	    <div>
		<div className="playerid"> You are Player {this.state.playerId}, playing with {this.state.symbol}</div>
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

class Chat extends React.Component {
    constructor(props){
	super(props);
    }
    
    addMessage() {
	$(".chat").append("<div className='message'> new message</div>");
    }
    
    render() {
	return (
	    <div className="chat" >
		<button onClick={this.addMessage}> add message </button>
		{this.children}
	    </div>
	)
    }
}

class Screen extends React.Component {

    constructor(props) {
	super(props);
	this.state = {value: ''};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    connectToPartner(id) {
	outgoingConnection = local.connect(id);
    }

    handleSubmit(event) {
	this.connectToPartner(this.state.value);
	event.preventDefault();
    }


    handleChange(event) {
	this.setState({value: event.target.value});
    }
    render() {
	return (
	    <div className = "screen" >
		<Game/>
		<div className = "credentials">
		    <input id="peerid"/><br/>

		    <form onSubmit={this.handleSubmit}>
			<label>
			    Partner peer id:
			    <input type="text" value={this.state.value} onChange={this.handleChange} />
			</label>
			<input type="submit" value="Submit" />
		    </form>
		    <Chat/>
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


// auxiliary functions

function timeout () {
    	    setTimeout(() => {
		console.log("Delayed for 1 second.");
	    }, 1000);
}