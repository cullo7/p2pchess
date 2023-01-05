import React from 'react';

import Game from './Game.js';

export default class Board extends React.Component {
    constructor(props) {
	super(props);
    }

    
    render() {
	return (
	    <div className="board">
		<Game click={this.props.click}/>
	    </div>
	);
    }
}
