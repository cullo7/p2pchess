import React from 'react';
import $ from 'jquery';

export default class Chat extends React.Component {
    constructor(props){
	super(props);
    }
    
    addMessage() {
	$(".chat").append("<div className='message'> new message</div>");
    }
    
    render() {
	return (
	    <div className="chat" >
		<button onClick={this.addMessage}> add message </button>
		{this.children}
	    </div>
	)
    }
}

