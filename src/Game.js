import React from 'react';

import Board from './Board.js';

export default class Game extends React.Component {

    render() {
	return (
	    <div className="game">
		<div className="game-board">
		    <Board state={this.props.state}/>
		</div>
	    </div>
	);
    }

}
