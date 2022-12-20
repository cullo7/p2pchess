// peer declarations
const local = new Peer();
var conn = undefined;

local.on("open", (id) => {
    //    alert("my id is " + id);
    document.getElementById("peerid").value = id;
});

local.on("connection", (otroconn) => {
    otroconn.on('open', function() {
	alert("connection opened");
    });
    otroconn.on('data', function(data) {
        alert("data: " + data);
    });
});

function sendMessage(s) {
    if (conn == undefined) {
	alert("connection not established");
    } else {
	conn.send(s);
	//post message
    }
}

var input = document.getElementById("message");
  input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
  sendMessage(input.value);
  input.value = "";
  }
  });

var otroIp = document.getElementById("otropeerid");
var connectButton = document.getElementById("connect");
connectButton.onclick = () => {
    if (otroIp.value == "") {
	alert("missing remote IP");
    } else {
	alert("trying to connect");
	conn = local.connect(otroIp.value);
    }
}

// Jquery for chat functionality

$(document).ready(function(){
    $("#hide").click(function(){
	$( "p" ).hide();
    });
});
