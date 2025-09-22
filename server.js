// Telepítés: npm init -y && npm i express socket.io
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const rooms = {};

io.on('connection', (socket) => {
  console.log('csatlakozott:', socket.id);

  socket.on('createRoom', ({ roomId, name }, cb) => {
    if (rooms[roomId]) return cb({ ok: false, msg: 'Már létezik' });
    rooms[roomId] = { players: [], actions: [] };
    socket.join(roomId);
    rooms[roomId].players.push({ id: socket.id, name });
    cb({ ok: true });
    io.to(roomId).emit('roomUpdate', rooms[roomId]);
  });

  socket.on('joinRoom', ({ roomId, name }, cb) => {
    const r = rooms[roomId];
    if (!r) return cb({ ok: false, msg: 'Nincs ilyen szoba' });
    if (r.players.length >= 3) return cb({ ok: false, msg: 'Teli' });
    socket.join(roomId);
    r.players.push({ id: socket.id, name });
    cb({ ok: true });
    io.to(roomId).emit('roomUpdate', r);
  });

  socket.on('gameAction', ({ roomId, action }) => {
    const r = rooms[roomId];
    if (!r) return;
    r.actions.push({ player: socket.id, action });
    io.to(roomId).emit('gameAction', { player: socket.id, action });
  });

  socket.on('disconnect', () => {
    for (const [roomId, r] of Object.entries(rooms)) {
      r.players = r.players.filter(p => p.id !== socket.id);
      io.to(roomId).emit('roomUpdate', r);
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log('Szerver fut a porton:', PORT));
