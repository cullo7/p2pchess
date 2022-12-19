// peer declarations
const caller = new Peer('initiatorId', { debug: 3 });
const callee = new Peer('calleId', { debug: 3 });

//caller listeners
caller.on("open", () => {
    alert("caller opened");
});


// callee listeners
callee.on("open", () => {
    alert("callee opened");
    // connection needs to be declared here so that all the listeners are initialized
    const conn = caller.connect('calleId');
});

callee.on("connection",  () => {
    alert("connection received by callee");
});
