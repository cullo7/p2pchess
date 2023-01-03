import React from 'react';

import Row from './Row.js';

//=========================
// TICTACTOE react code
//========================


export default class Board extends React.Component {
    constructor(props) {
	super(props);
	alert(this.props.live);
    }

    /*
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
	if (this.outgoingConnection == undefined) {
	    console.log("no connection to send message");
	} else {
	    this.outgoingConnection.send(message);
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
	if (this.outgoingConnection == undefined) {
	    console.log("no connection established");
	    return;
	}
	const squares = this.state.squares.slice();
	if(!this.checkMove(squares, i)) {
	    console.log(" move not permitted");
	    return false;
	}
	this.outgoingConnection.send(i);
	return true;
    }

    checkMove(squares, i) {
	if (false || squares[i] || !this.state.iAmNext) {
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
    
    renderRow(color) {
	if (color  === "white") {
	    return <Row color={"white"}/>;
	} else {
	    return <Row color={"black"}/>;
	}
    }
*/
    render() {
	/*
	const winner = false;
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
		    {this.renderRow("white")}
		</div>
		<div className="board-row">
		    {this.renderRow("brown")}

		</div>
		<div className="board-row">
		    {this.renderRow("white")}

		</div>
		<div className="board-row">
		    {this.renderRow("brown")}

		</div>
		<div className="board-row">
		    {this.renderRow("white")}

		</div>
		<div className="board-row">
		    {this.renderRow("brown")}

		</div>
		<div className="board-row">
		    {this.renderRow("white")}

		</div>
		<div className="board-row">
		    {this.renderRow("brown")}
		</div>
	    </div>
	);
    }
}
