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
			ready: false,
		};
	}

	componentDidMount() {
		console.log("start mount");
		this.initializeBoard();
		console.log("finish mount");
	}

	initializeBoard() {
		console.log("init");
		for (let index = 0; index < this.state.squares.length; index++) {
			let row = Math.floor(index / BOARD_WIDTH);
			switch (row) {
				case 0:
				case 7:
					this.setMainPiece(index);
					break;
				case 1:
				case 6:
					this.setPawn(index);
					break;
				default:
			}
		}
	}

	setMainPiece(index) {
		switch (index % BOARD_WIDTH) {
			case 0:
				this.setRook(index)
				break;
			case 1:
				this.setRook(index)

				break;
			case 2:
				this.setRook(index)
				break;
			case 3:
				this.setRook(index)
				break;
			case 4:
				this.setRook(index)
				break;
			case 5:
				this.setRook(index)
				break;
			case 6:
				this.setRook(index)
				break;
			case 7:
				this.setRook(index)
				break;
			default:
				console.log("rowIndex invalid value");
				return;
		}
	}

	updateSquare(index, state) {
		const squares = this.state.squares.slice();
		squares[index] = state;
		this.setState({
			squares: squares,
		});
		if (index === NUM_SQUARES) {
			this.setState({
				ready: true,
			});
		}
	}

	setRook(index) {
		//	if (index > 0) {
		this.updateSquare(index, {
			color: 1,
			piece: "r"
		});
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
		if (index > WHITE_SIDE) {
			this.updateSquare(index, {
				color: 0,
				piece: "p"
			})
		} else {
			this.updateSquare(index, {
				color: 1,
				piece: "p"
			})
		}
	}

	getPieceInfo(index) {
		console.log("getPiece");
		if(this.state.squares[index].color === undefined) {
			console.log("value not available");
		} else {
			return this.state.squares[index]
		}
	}

	render() {
		return (
			<div>
				{this.state.squares.slice(0, 5).map((square, index) => (
					<Square key={index} id={index} getPieceInfo={() => this.getPieceInfo(index)} />
				))}

			</div>
		);
	}

}
