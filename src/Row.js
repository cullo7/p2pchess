import React from 'react';

import Square from './Square.js';

export default class Row extends React.Component {
    render() {
	if (this.props.color === "white"){
	    return (
		<>
		    <Square color="white"/>
		    <Square color="brown"/>
		    <Square color="white"/>
		    <Square color="brown"/>
		    <Square color="white"/>
		    <Square color="brown"/>
		    <Square color="white"/>
		    <Square color="brown"/>
		</>
	    );
	} else {
	    return (
		<>
		    <Square color="brown"/>
		    <Square color="white"/>
		    <Square color="brown"/>
		    <Square color="white"/>
		    <Square color="brown"/>
		    <Square color="white"/>
		    <Square color="brown"/>
		    <Square color="white"/>
		</>


	    );
	}
    }
}
