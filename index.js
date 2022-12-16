// PeerJS seems instable...

var myPeerId = document.getElementById('myPeerId');
var peerId = document.getElementById('peerId');
var connectButton = document.getElementById('connect');

var peer = new Peer();
peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  myPeerId.text = id;
});
peer.on('error', function(err) { console.log(err); });
peer.on('connection', function(conn) { console.log('new connection : ',conn); });

connectButton.onclick = function() {
  var conn = peer.connect(peerId.value);
    console.log(conn);
    console.log("waiting for more data..");
  conn.on('open', function() {
    // Receive messages
    conn.on('data', function(data) {
      console.log('Received');
    });

    // Send messages
    conn.send('Hello!');
  });
      conn = peer.connect(peerId.value);

};
