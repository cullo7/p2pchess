// caller side
const caller = new Peer('initiatorId', { debug: 3 });
const callee = new Peer('calleId', { debug: 3 });

var conn = caller.connect('calleId');

caller.on("open", () => {alert("caller opened");});
callee.on("open", () => {alert("callee opened");});
printname = (str) => {alert(str);};

caller.on("connection", printname("connection"));

