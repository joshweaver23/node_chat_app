let express = require( 'express' );
let socket = require( 'socket.io' );
let port = 8000;

let app = express();

// Server
let server = app.listen( port, () => {
    console.log( `Server is listening on ${port}` );
} );
app.use( express.static( 'public' ) );

// Socket
let io = socket( server );
io.on( 'connection', socket => {
    socket.on( 'chat', data => {
        io.sockets.emit( 'chat', data );
    } );
    socket.on ( 'typing', data => {
        socket.broadcast.emit( 'typing', data );
    } );
} );