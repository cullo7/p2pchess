// peer declarations
const local = new Peer();
var incomingConnection = undefined;
var outgoingConnection = undefined;

local.on("open", (id) => {
    document.getElementById("peerid").value = id;
});

local.on("connection", (otroconn) => {
    otroconn.on('open', function() {
	if (outgoingConnection == undefined) {
	    outgoingConnection = local.connect(otroconn.peer);
	}
    });
    otroconn.on('data', function(data) {
        postMessageReceived(data);
    });
    incomingConnection = otroconn;
});

function sendMessage(s) {
    if (outgoingConnection == undefined) {
    } else {
	outgoingConnection.send(s);
	postMessageSent(s);
    }
}

var input = document.getElementById("message");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
	if (input.value != "") {
	    sendMessage(input.value);
	    input.value = "";
	}
    }
});

var otroIp = document.getElementById("otropeerid");
otroIp.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
	if (otroIp.value != "") {
	    outgoingConnection = local.connect(otroIp.value);
	} else {
	    alert("no IP provided");
	}
    }
});

// Jquery for chat functionality

$(document).ready(function(){
    postMessageReceived = function(message) {
	$("#chat").append(
	    "<div class='receiver message'>" + message + " </div>"
	);
    }

    postMessageSent = function(message) {
	$("#chat").append(
	    "<div class='sender message'>" + message + " </div>"
	);
    }

});

window.setInterval(function() {
    var elem = document.getElementById('chat');
    elem.scrollTop = elem.scrollHeight;
}, 500);
