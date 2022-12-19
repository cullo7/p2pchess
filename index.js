// peer declarations
const caller = new Peer('initiatorId', { debug: 3 });
const callee = new Peer('calleId', { debug: 3 });
var conn;

//caller listeners
caller.on("open", () => {
//    alert("caller opened");
});

// callee listeners
callee.on("open", () => {
    alert("callee opened");
    // connection needs to be declared here so that all the listeners are initialized
    conn = caller.connect('calleId');
});

callee.on("connection", (otroconn) => {
    alert('peer connected');
    otroconn.on('open', function() {
        console.log('conn open');
	sendMessage("hi");

    });
    otroconn.on('data', function(data) {
        console.log(data);
    });
});

function sendMessage(s) {
    conn.send(s);
}
