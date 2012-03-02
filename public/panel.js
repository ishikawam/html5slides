/* socket.io */

//Interaction with server using Socket.IO
var socket = io.connect(location.protocol + '//' + location.host + '/control');

socket.on('connect', function(commands) {
	$('#loadingMessage').hide();
});

// recieve message
socket.on('message', function(msg) {
	console.log(msg);
  $("#receiveMsg").html(msg);
});

// send message
function SendMsg(msg) {
  socket.send(msg);
}
// disconnect
function DisConnect() {
  socket.disconnect();
}