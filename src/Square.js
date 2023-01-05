import React from 'react';

// react components
import Piece from './Piece.js';

// Global vars
var BOARD_WIDTH = 8;

export default class Square extends React.Component {

    constructor(props) {
	super(props);
	this.index = this.props.id;
	this.row = Math.floor(this.index / BOARD_WIDTH);
	this.rowIndex = this.index % BOARD_WIDTH;
    }
    
    getColor() {
	if (this.row % 2 == 0) {
	    return this.index % 2 == 0 ? "red" : "white";
	} else {
	    return this.index % 2 == 0 ? "white" : "red";
	}
    }
    
    getPiece() {
	let side;
	if (this.row == 0 || this.row == 1) {
	    side = 0;
	} else {
	    side = 1;
	}
	switch (this.row) {
	case 0:
	case 7:
	    return this.getMainPiece(side)
	    break;
	case 1:
	case 6:
	    return this.getPawn(side)
	    break;
	default:
	    return;
	}
	return this.row;
    }

    getMainPiece(c) {
	switch(this.rowIndex) {
	case 0:
	    return <Piece type="r" color={c}/>;
	    break;
	case 1:
	    return <Piece type="kn" color={c}/>;
	    break;
	case 2:
	    return <Piece type="b" color={c}/>;
	    break;
	case 3:
	    return <Piece type="q" color={c}/>;
	    break;
	case 4:
	    return <Piece type="k" color={c}/>;
	    break;
	case 5:
	    return <Piece type="b" color={c}/>;
	    break;
	case 6:
	    return <Piece type="kn" color={c}/>;
	    break;
	case 7:
	    return <Piece type="r" color={c}/>;
	    break;
	default:
	    console.log("default hit");
	    return;
	}
    }

    getPawn(c) {
	return <Piece type="p" color={c}/>;
    }
    
    render() {
	return (
	    <button className="square"
		    onClick={() => this.props.onClick()}
		    style={{backgroundColor: this.getColor()}}
	    >
	    </button>
	);
    }
}
