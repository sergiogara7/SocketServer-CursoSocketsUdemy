import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server{

    private static _intance: Server;

    public app: express.Application;
    public port: number;
    public io: SocketIO.Server;
    public httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        //
        this.escucharSockets();
    }

    public static get instance(){
        return this._intance || ( this._intance = new this() );
    }

    start(callback: Function){

        //this.app.listen(this.port, callback);
        this.httpServer.listen(this.port, callback);

    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets =>');
        
        this.io.on('connection', cliente =>{


            console.log(' ++ Cliente conectado !!', cliente.id);
            
            // Conectar Cliente
            socket.conectarCliente(cliente);

            // configurar usuarios
            socket.configurarUsuario(cliente, this.io)

            // mensaje
            socket.mensaje(cliente,this.io);

            // desconectar
            socket.desconectar(cliente);
        });
    }
}