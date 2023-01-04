
import React from 'react';

import Square from './Square.js';


//=========================
// TICTACTOE react code
//========================


export default class Board extends React.Component {
    constructor(props) {
	super(props);
	this.state = {squares: new Array(64).fill(null)}
    }
    /*
      tryToSendMessage(message) {
      if (this.outgoingConnection == undefined) {
      console.log("no connection to send message");
      } else {
      this.outgoingConnection.send(message);
      }
      }

      receiveClick(i) {
      const squares = this.state.squares.slice();
      if (this.state.symbol == 'X') {
      squares[i] = 'O';
      } else {
      squares[i] = 'X';
      }
      this.setState({
      squares: squares,
      iAmNext: !this.state.iAmNext,
      });

      }	

      handleSendClick(i) {
      if(!this.sendClick(i)) {
      return;
      }
      this.handleClick(i);
      }
      
      sendClick(i) {
      if (this.outgoingConnection == undefined) {
      console.log("no connection established");
      return;
      }
      const squares = this.state.squares.slice();
      if(!this.checkMove(squares, i)) {
      console.log(" move not permitted");
      return false;
      }
      this.outgoingConnection.send(i);
      return true;
      }

      checkMove(squares, i) {
      if (false || squares[i] || !this.state.iAmNext) {
      console.log(this.state.iAmNext);
      return false;
      }
      return true;
      }

      handleClick(i) {
      const squares = this.state.squares.slice();
      if(!this.checkMove(squares, i)) {
      console.log(" move not permitted");
      return;
      }
      squares[i] = this.state.symbol;
      this.setState({
      squares: squares,
      iAmNext: !this.state.iAmNext,
      });
      }
      
      renderRow(color) {
      if (color  === "white") {
      return <Row color={"white"}/>;
      } else {
      return <Row color={"black"}/>;
      }
      }
    */


    handleClick() {
	console.log("click handled");
    }

    renderBoard() {
	return this.state.squares.map((square,index) => (
	    <Square key={index} id={index}/>
	));
				     
    }
    
    render() {
	return (
	    <div className="board">
		{this.renderBoard()}
	    </div>
	);
    }
}
