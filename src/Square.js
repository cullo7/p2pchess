import React from 'react';

// react components
import Piece from './Piece.js';

export default class Square extends React.Component {

    constructor(props) {
	super(props);
    }
    
    getColor() {
	if (this.row % 2 == 0) {
	    return this.index % 2 == 0 ? "red" : "white";
	} else {
	    return this.index % 2 == 0 ? "white" : "red";
	}
    }
    
    render() {
	return (
	    <div
		className="square"
		style={{backgroundColor: this.getColor()}}
	    >
		{this.props.atSquare()}
	    </div>
	);
    }
}
