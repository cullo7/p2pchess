import React from 'react';

import wknight from './media/white/Knight.png';
import bknight from './media/black/Knight.png';
import wking from './media/white/King.png';
import bking from './media/black/King.png';
import wqueen from './media/white/Queen.png';
import bqueen from './media/black/Queen.png';
import wrook from './media/white/Rook.png';
import brook from './media/black/Rook.png';
import wpawn from './media/white/Pawn.png';
import bpawn from './media/black/Pawn.png';
import wbishop from './media/white/Bishop.png';
import bbishop from './media/black/Bishop.png';

export default class Square extends React.Component {

	getImg() {
		let state = this.props.getPieceInfo();
		if (state !== undefined) {
			let color = state.color ? "./white" : "./black";
			switch (state.piece) {
				case "kn":
					return this.getImgBySrc(color ? wknight : bknight);
				case "k":
					return this.getImgBySrc(color ? wking : bking);
				case "r":
					return this.getImgBySrc(color ? wrook : brook);
				case "b":
					return this.getImgBySrc(color ? wbishop : bbishop);
				case "q":
					return this.getImgBySrc(color ? wqueen : bqueen);
				case "p":
					return this.getImgBySrc(color ? wpawn : bpawn);
				default:
			}
		}
	}

	getImgBySrc(source) {
		return (
			<div>
				<img className="piece" src={source} alt="chess piece" />
			</div>
		);
	}

	getColor() {
		if (this.row % 2 === 0) {
			return this.index % 2 === 0 ? "red" : "white";
		} else {
			return this.index % 2 === 0 ? "white" : "red";
		}
	}

	render() {
		return (
			<div
				className="square"
				style={{ backgroundColor: this.getColor() }}
			>
				{this.getImg()}
			</div>
		);
	}
}
