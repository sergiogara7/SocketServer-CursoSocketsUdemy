import { Socket } from "socket.io";
import  SocketIO  from "socket.io";
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";

export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);

}


export const desconectar = (cliente: Socket) =>{
    cliente.on('disconnect',()=>{
        console.log('--- Cliente desconectado !!');
        usuariosConectados.borrarUsuario(cliente.id);
    });
};

// mensaje nuevo
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: any) => {
        console.log('Mensaje recibido=> ',payload.cuerpo);

        // emitir a todos los usuarios
        io.emit('mensaje-nuevo', payload)
    });
}

// configurar-usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: any, callback: Function) => {
        //console.log('Configurando usuario => ',payload.nombre);

        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);

        callback({
            ok: true,
            mensje: `Usuario ${ payload.nombre }, configurado correctamente !!`
        });
    });
}