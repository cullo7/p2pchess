import React from 'react';

import Square from './Square.js';

export default class Game extends React.Component {

    constructor(props) {
	super(props);
	this.state = {squares: new Array(64).fill(null)};
	this.createSquares();
	
    }

    createSquares() {
	this.setState({
	    squares: this.state.squares.map((square,index) => (
		<button>h</button>
//		<Square key={index} id={index} onClick={this.props.click}/>
	    )),
	});
    }
    


    renderSquares() {
	return this.state.squares;
    }

    
    render() {
	return (
	    <>
	    {this.renderSquares()}
		</>
	);
    }

}
