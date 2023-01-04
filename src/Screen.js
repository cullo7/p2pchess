import React from 'react';
import Game from './Game.js';
import Chat from './Chat.js';
import Peer from 'peerjs';

export default class Screen extends React.Component {

    constructor(props) {
	super(props);
	this.state = {value: '',
		      local: new Peer(),
		      incomingConnection: undefined,
		      outgoingConnection: undefined,
		     };

	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleChange = this.handleChange.bind(this);

	this.initializeP2P(this);

    }

    // setup p2p connection listeners
    initializeP2P(screenSelf) {

	// listener for when our peer node is created
	this.state.local.on("open", (id) => {
	    document.getElementById("peerid").value = id;
	});

	// listener for when another peer node connects to ours	
	this.state.local.on("connection", (otroconn) => {
	    console.log("connection successful");
	    otroconn.on('open', function() {
		// upon receiving a connection we open an adjacent connection (outgoing)
		if (screenSelf.state.outgoingConnection == undefined) {
		    screenSelf.setState({
			outgoingConnection: screenSelf.state.local.connect(otroconn.peer),
		    });
		}

	    });

	    // connection upon receiving data
	    otroconn.on('data', function(data) {
		console.log(data);
	    });
	    
	    otroconn.on('error', function(err) {
		console.log(err);
	    });

	    this.incomingConnection = otroconn;
	    b
	    
	});

	this.state.local.on('error', function(err) {
	    console.log(err);
	});
    }

    connectToPartner(id) {
	this.setState({
	    outgoingConnection: this.state.local.connect(id),
	});
    }

    handleSubmit(event) {
	this.connectToPartner(this.state.value);
	event.preventDefault();
    }

    handleChange(event) {
	this.setState({value: event.target.value});
    }
    
    render() {
	return (
	    <div className = "screen" >
		<Game state={this.state}/>
		<div className = "credentials">
		    <input id="peerid"/><br/>

		    <form onSubmit={this.handleSubmit}>
			<label>
			    Partner peer id:
			    <input type="text" value={this.state.value} onChange={this.handleChange} />
			</label>
			<input type="submit" value="Submit" />
		    </form>
		    <Chat/>
		</div>
	    </div>
	);
    }

}
