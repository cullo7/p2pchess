import React from 'react';

import knight from './Knight.png';

export default class Knight extends React.Component {
    render() {
	return (
	    <img
		className="piece"
		onClick={() => this.props.onClick()}
		src={knight}
	    >
	    </img>
	);
    }
}
