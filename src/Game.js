import React from 'react';

import Square from './Square.js';

// Global vars
var BOARD_WIDTH = 8;
var WHITE_SIDE = 15;
var WHITE = 1;
var BLACK = 0;
var NUM_SQUARES = 64;

export default class Game extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    squares: new Array(64).fill({
		color: undefined,
		piece: undefined,
	    }),
	    highlights: new Array(64).fill(0),
	};
    }

    componentDidMount() {
	this.initializeBoard();
    }

    initializeBoard() {
	const squares = this.state.squares.slice();
	for (let index = 0; index < this.state.squares.length; index++) {
	    let row = Math.floor(index / BOARD_WIDTH);
	    switch (row) {
	    case 0:
	    case 7:
		squares[index] = this.setMainPiece(index);
		break;
	    case 1:
	    case 6:
		squares[index] = this.setPawn(index);
		break;
	    default:
		squares[index] = {
		    color: -1,
		    piece: "",
		};
	    }
	}

	this.setState({
	    squares: squares,
	});
    }

    setMainPiece(index) {
	let color;
	if (index <= WHITE_SIDE) {
	    color = BLACK;
	} else {
	    color = WHITE;
	}
	switch (index % BOARD_WIDTH) {
	case 0:
	    return {
		color: color,
		piece: "r"
	    };
	case 1:
	    return {
		color: color,
		piece: "kn"
	    };
	case 2:
	    return {
		color: color,
		piece: "b"
	    };
	case 3:
	    return {
		color: color,
		piece: "q"
	    };
	case 4:
	    return {
		color: color,
		piece: "k"
	    };
	case 5:
	    return {
		color: color,
		piece: "b"
	    };
	case 6:
	    return {
		color: color,
		piece: "kn"
	    };
	case 7:
	    return {
		color: color,
		piece: "r"
	    };
	default:
	    console.log("rowIndex invalid value");
	    return;
	}
    }

    setPawn(index) {
	return {
	    color: -1,
	    piece: ""
	};
	if (index > WHITE_SIDE) {
	    return {
		color: WHITE,
		piece: "p"
	    };
	} else {
	    return {
		color: BLACK,
		piece: "p"
	    };
	}
    }

    getPieceInfo(index) {
	if (this.state.squares[index].color !== undefined) {
	    return this.state.squares[index];
	}
    }

    //unfinished
    checkMoves(index) {
	const square = this.state.squares[index];
	switch (square.piece) {
	case "kn":
	    this.highlightKnight(index);
	    break;
	case "k":
	    this.highlightKing(index);
	    break;
	case "r":
	    this.highlightRook(index);
	    break;
	case "b":
	    this.highlightBishop(index);
	    break;
	case "q":
	    this.highlightQueen(index);
	    break;
	case "p":
	    this.highlightPawn(index);
	    break;
	default:
	}
    }

    //incomplete
    highlightQueen(index){}

    //incomplete
    highlightPawn(){}
    
    //incomplete
    highlightBishop(index)  {
	const highlights = this.state.highlights.slice();
	const row = Math.floor(index / BOARD_WIDTH);
	const xIndex = index % BOARD_WIDTH;
	//northeast
	let pos = index;
	do {
	    this.highlight(pos, highlights);
	    pos -= (BOARD_WIDTH-1);
	} while (pos > 0);
	//southwest
	pos = index;
	do {
	    this.highlight(pos, highlights);
	    pos += (BOARD_WIDTH-1);
	} while (pos > 0);
	//northwest-southeast
	for(let pos = (row + xIndex) * BOARD_WIDTH; pos < 0 && pos != index; pos -= (BOARD_WIDTH-1)) {
	    this.highlight(pos, highlights);
	}

	this.setState({
	    highlights: highlights,
	})
	
    }
    highlightKing(index) {
	const highlights = this.state.highlights.slice();
	//north
	this.highlight(index - 1 * BOARD_WIDTH, highlights);
	//northeast
	this.highlight(index - 1 * BOARD_WIDTH + 1, highlights);
	//east
	this.highlight(index + 1, highlights);
	//southeast
	this.highlight(index + 1 * BOARD_WIDTH + 1, highlights);
	//south
	this.highlight(index + 1 * BOARD_WIDTH, highlights);
	//southwest
	this.highlight(index + 1 * BOARD_WIDTH - 1, highlights);
	//west
	this.highlight(index - 1, highlights);
	//northwest
	this.highlight(index - 1 * BOARD_WIDTH - 1, highlights);

	this.setState({
	    highlights: highlights,
	})

    }

    highlightRook(index) {
	const highlights = this.state.highlights.slice();
	const row = Math.floor(index / BOARD_WIDTH);
	//north-south
	for(let pos = index % BOARD_WIDTH; pos < NUM_SQUARES && pos != index; pos += BOARD_WIDTH) {
	    this.highlight(pos, highlights);
	}
	//east-west
	for(let pos = row * BOARD_WIDTH; pos < row * (BOARD_WIDTH+1) && pos != index; pos++) {
	    this.highlight(pos, highlights);
	}

	this.setState({
	    highlights: highlights,
	})

    }

    highlightKnight(index) {
	const highlights = this.state.highlights.slice();
	// north
	// up 2, right 1
	this.highlight(index - 2 * BOARD_WIDTH + 1, highlights);
	// up 2, left 1
	this.highlight(index - 2 * BOARD_WIDTH - 1, highlights);
	// right
	// right 2, up 1
	this.highlight(index + 2 + 1 * BOARD_WIDTH, highlights);
	// right 2, down 1
	this.highlight(index + 2 - 1 * BOARD_WIDTH, highlights);
	// south
	// south 2, right 1
	this.highlight(index + 2 * BOARD_WIDTH + 1, highlights);
	// south 2, left 1
	this.highlight(index + 2 * BOARD_WIDTH - 1, highlights);
	// left
	// left 2, up 1
	this.highlight(index - 2 + 1 * BOARD_WIDTH, highlights);
	// left 2, down 1
	this.highlight(index - 2 - 1 * BOARD_WIDTH, highlights);

	this.setState({
	    highlights: highlights,
	})

    }

    highlight(index, highlights) {
	if(index >= NUM_SQUARES) {
	    return;
	}
	if(this.hasPiece(index)) {
	    return;
	}
	highlights[index] = 1;
    }

    hasPiece(index) {
	return this.state.squares[index].piece != "";
    }

    render() {
	return (
	    <div>
		{this.state.squares.map((square, index) => (
		    <Square
			key={index}
			id={index}
			getPieceInfo={() => this.getPieceInfo(index)}
			checkMoves={() => this.checkMoves(index)}
			highlight={this.state.highlights[index]}
		    />
		))}
	    </div>
	);
    }

}
