import React from 'react';

import Square from './Square.js';

export default class Game extends React.Component {

    constructor(props) {
	super(props);
	this.state = {squares: new Array(64).fill(null)};
    }

    render() {
	return (
	    <div>
	    	{this.state.squares.map((square,index) => (
		    <Square key={index} id={index} onClick={this.props.click}/>
		))}

	    </div>
	);
    }

}
