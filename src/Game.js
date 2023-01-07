import React from 'react';

import Square from './Square.js';

// Global vars
var BOARD_WIDTH = 8;

export default class Game extends React.Component {

    constructor(props) {
	super(props);
	this.state = {squares: new Array(64).fill({
	    color: undefined,
	    piece: undefined,
	})};
	this.initializeBoard();
    }

    initializeBoard() {
	for (let index = 0; index < this.state.squares.length; index++) {
	    let row = Math.floor(index / BOARD_WIDTH);
	    let rowIndex = index % BOARD_WIDTH;
	    let side;
	    if (row == 0 || row == 1) {
		side = 0;
	    } else {
		side = 1;
	    }
	    switch (row) {
	    case 0:
	    case 7:
		return this.setMainPiece(side, rowIndex);   //// basically got here
		break;
	    case 1:
	    case 6:
		return this.getPawn(side, rowIndex);
		break;
	    default:
		return;
	    }
	    return row;
	}
    }
    
    getMainPiece(c, rowIndex) {
	switch(rowIndex) {
	case 0:
	    return <Piece type="r" color={c} onClick={() => this.props.move()}/>;
	    break;
	case 1:
	    return <Piece type="kn" color={c} onClick={() => this.props.move()}/>;
	    break;
	case 2:
	    return <Piece type="b" color={c} onClick={() => this.props.move()}/>;
	    break;
	case 3:
	    return <Piece type="q" color={c} onClick={() => this.props.move()}/>;
	    break;
	case 4:
	    return <Piece type="k" color={c} onClick={() => this.props.move()}/>;
	    break;
	case 5:
	    return <Piece type="b" color={c} onClick={() => this.props.move()}/>;
	    break;
	case 6:
	    return <Piece type="kn" color={c} onClick={() => this.props.move()}/>;
	    break;
	case 7:
	    return <Piece type="r" color={c} onClick={() => this.props.move()}/>;
	    break;
	default:
	    console.log("default hit");
	    return;
	}
    }

    getPawn(c) {
	return <Piece type="p" color={c} onClick={() => this.props.move()}/>;
    }

    handleClick(index) {
	console.log("handleClick in Game:");
    }
    
    render() {
	return (
	    <div>
	    	{this.state.squares.map((square,index) => (
		    <Square key={index} id={index} move={() => handleClick(index)} piece={() => getPiece()}/>
		))}

	    </div>
	);
    }

}
