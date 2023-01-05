
import React from 'react';

import Square from './Square.js';


//=========================
// TICTACTOE react code
//========================


export default class Board extends React.Component {
    constructor(props) {
	super(props);
	this.state = {squares: new Array(64).fill(null)}
    }

    handleClick() {
	console.log("click handled");
    }

    renderBoard() {
	return this.state.squares.map((square,index) => (
	    <Square key={index} id={index}/>
	));
				     
    }
    
    render() {
	return (
	    <div className="board">
		{this.renderBoard()}
	    </div>
	);
    }
}
