import React from 'react';

import Square from './Square.js';

// Global vars
var BOARD_WIDTH = 8;
var WHITE_SIDE = 14;
var NUM_SQUARES = 64;

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
			}
		}

		this.setState({
			squares: squares,
		});

	}

	setMainPiece(index) {
		switch (index % BOARD_WIDTH) {
			case 0:
				return this.setRook(index)
				break;
			case 1:
				return this.setRook(index)
				break;
			case 2:
				return this.setRook(index)
				break;
			case 3:
				return this.setRook(index)
				break;
			case 4:
				return this.setRook(index)
				break;
			case 5:
				return this.setRook(index)
				break;
			case 6:
				return this.setRook(index)
				break;
			case 7:
				return this.setRook(index)
				break;
			default:
				console.log("rowIndex invalid value");
				return;
		}
	}

	setRook(index) {
		//	if (index > 0) {
		return this.updateSquare(index);

		/*
		  } else {
		  this.updateSquare(index, {
		  color:"black",
		  piece:"r"
		  });
		  }
		*/
	}

	setPawn(index) {
		// if (index > WHITE_SIDE) {
		// 	this.updateSquare(index, {
		// 		color: 0,
		// 		piece: "p"
		// 	})
		// } else {
		// 	this.updateSquare(index, {
		// 		color: 1,
		// 		piece: "p"
		// 	})
		// }
		return this.updateSquare(index);

	}

	updateSquare(index) {
		const squares = this.state.squares.slice();
		return {
			color: 0,
			piece: "p"
		};
		// if (index === NUM_SQUARES) {
		// 	this.setState({
		// 		ready: true,
		// 	});
		// }
	}

	getPieceInfo(index) {
		if (this.state.squares[index].color === undefined) {
			console.log("value not available");
		} else {
			console.log("defined", this.state.squares[index]);
			return this.state.squares[index];
		}
	}

	setVal() {
		console.log("setting val");
		const squares = this.state.squares.slice();
		squares[0] = {
			color: 1,
			piece: "k",
		};
		this.setState({
			squares: squares,
		});
	}

	render() {
		return (
			<div>
				{this.state.squares.slice(0, 5).map((square, index) => (
					<Square key={index} id={index} getPieceInfo={() => this.getPieceInfo(index)} letter={this.state.squares[index].piece} />
				))}
			</div>
		);
	}

}
