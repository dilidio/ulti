const socket = io();
let currentRoom = null;

document.getElementById('create').onclick = () => {
  socket.emit('createRoom', { roomId: document.getElementById('room').value, name: document.getElementById('name').value }, (res) => {
    document.getElementById('status').innerText = JSON.stringify(res);
    if (res.ok) currentRoom = document.getElementById('room').value;
  });
};

document.getElementById('join').onclick = () => {
  socket.emit('joinRoom', { roomId: document.getElementById('room').value, name: document.getElementById('name').value }, (res) => {
    document.getElementById('status').innerText = JSON.stringify(res);
    if (res.ok) currentRoom = document.getElementById('room').value;
  });
};

socket.on('roomUpdate', (data) => {
  console.log('roomUpdate', data);
});

socket.on('gameAction', (data) => {
  console.log('gameAction', data);
  processIncomingAction(data.action);
});

function sendGameAction(action) {
  if (!currentRoom) return;
  socket.emit('gameAction', { roomId: currentRoom, action });
}

function processIncomingAction(action) {
  if (action.startsWith("RS:")) folytatas();
  if (action.startsWith("ADU:")) selectAdu(parseInt(action.split(":")[1]));
  // további mappingek szükségesek az ulti.js logika szerint
}
