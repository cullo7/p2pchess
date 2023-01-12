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
				//add setting default values for squares without pieces
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
				this.highlightKnight(index);
				break;
			case "r":
				this.highlightKnight(index);
				break;
			case "b":
				this.highlightKnight(index);
				break;
			case "q":
				this.highlightKnight(index);
				break;
			case "p":
				this.highlightKnight(index);
				break;
			default:
		}
	}

	highlightKnight(index) {
		// north
		// up 2, right 1
		this.highlight(index - 2 * BOARD_WIDTH + 1);
		// up 2, left 1
		this.highlight(index - 2 * BOARD_WIDTH - 1);
		// right
		// right 2, up 1
		this.highlight(index + 2 + 1 * BOARD_WIDTH);
		// right 2, down 1
		this.highlight(index + 2 - 1 * BOARD_WIDTH);
		// south
		// south 2, right 1
		this.highlight(index + 2 * BOARD_WIDTH + 1);
		// south 2, left 1
		this.highlight(index + 2 * BOARD_WIDTH - 1);
		// left
		// left 2, up 1
		this.highlight(index - 2 + 1 * BOARD_WIDTH);
		// left 2, down 1
		this.highlight(index - 2 - 1 * BOARD_WIDTH);
	}

	highlight(index) {
		const highlights = this.state.highlights.slice();
		if(index < NUM_SQUARES) {
			highlights[index] = 1;
		}
		this.setState({
			highlights: highlights,
		})
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
