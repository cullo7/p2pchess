import React from 'react';

import Square from './Square.js';

// Global vars
var BOARD_WIDTH = 8;
var WHITE_SIDE = 15;
var WHITE = 1;
var BLACK = 0;

export default class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			squares: new Array(64).fill({
				color: undefined,
				piece: undefined,
			}),
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
		if(index <= WHITE_SIDE) {
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
				return;
			case "k":
				return;
			case "r":
				return;
			case "b":
				return;
			case "q":
				return;
			case "p":
				return;
			default:
		}
	}

	render() {
		return (
			<div>
				{this.state.squares.map((square, index) => (
					<Square key={index} id={index} getPieceInfo={() => this.getPieceInfo(index)} checkMoves={() => this.checkMoves(index)}/>
				))}
			</div>
		);
	}

}
