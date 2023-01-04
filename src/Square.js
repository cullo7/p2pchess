import React from 'react';

import Knight from './Knight.js';

export default class Square extends React.Component {
    getColor() {
	var index = this.props.id;
	var indexEight = Math.floor(index/8);
	if (indexEight % 2 == 0) {
	    return index % 2 == 0 ? "red" : "white";
	} else {
	    return index % 2 == 0 ? "white" : "red";
	}
    }
    
    render() {
	return (
	    <button className="square"
		    onClick={() => this.props.onClick()}
		    style={{backgroundColor: this.getColor()}}
	    >
		<Knight/>
	    </button>
	);
    }
}
