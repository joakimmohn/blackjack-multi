const app = require('express')();
const serveStatic = require('serve-static');
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const newGame = require('./lib/blackjack.js');

const port = process.env.PORT || 5000;

server.listen(port);

console.log("server is listening on port: ", port);

const session = new Set();

const url = process.env.PWD + '/client/build';

app.use(serveStatic('public'));


console.log(url);

const game = newGame();

io.on('connection', function(socket) {

  if(game.inProgress()) {
    socket.emit('game', game.toJson());
  }

  socket.on('deal', function() {

    game.joinTable(socket.id);

    if(!game.inProgress()) {
      game.startRound();
    }

    io.emit('game', game.toJson());
  });

  socket.on('hit', function() {
    if(game.inProgress()) {
      game.hit(socket.id);
      io.emit('game', game.toJson());
    }
    if(game.winnerDeclared()) {
      setTimeout(function() {
        game.startRound();
        io.emit('game', game.toJson());
      }, 3000);
    }
  });

  socket.on('stand', function() {
    if(game.inProgress()) {
      game.stand(socket.id);
      io.emit('game', game.toJson());
    }

    if(game.winnerDeclared()) {
      setTimeout(function() {
        game.startRound();
        io.emit('game', game.toJson());
      }, 3000);
    }

  });

  socket.on('disconnect', function() {
    game.leave(socket.id);
    session.delete(socket.id);
  });
});
