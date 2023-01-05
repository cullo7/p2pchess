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

export default class Pieces extends React.Component {

    getImgSrc() {
	let color = this.props.color ? "./white" : "./black";
	switch(this.props.type) {
	case "kn":
	    return this.props.color ? wknight : bknight;
	    break;
	case "k":
	    return this.props.color ?  wking : bking;
	    break;
	case "r":
	    return this.props.color ?  wrook : brook;
	    break;
	case "b":
	    return this.props.color ?  wbishop : bbishop;
	    break;
	case "q":
	    return this.props.color ?  wqueen : bqueen;
	    break;
	case "p":
	    return this.props.color ?  wpawn : bpawn;
	    break;
	default:
	    break;
	}
    }
    
    render() {
	return (
	    <img
		className="piece"
		onClick={() => this.props.onClick()}
		src={this.getImgSrc()}
	    >
	    </img>
	);
    }
}
