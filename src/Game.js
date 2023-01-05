import React from 'react';

import Board from './Board.js';

export default class Game extends React.Component {

    constructor(props) {
	super(props);
    }
    
    render() {
	return (
	    <div className="game">
		<div className="game-board">
		    <Board click={this.props.click}/>
		</div>
	    </div>
	);
    }

}
