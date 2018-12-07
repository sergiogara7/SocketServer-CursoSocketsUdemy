import { Socket } from "socket.io";
import  SocketIO  from "socket.io";
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";

export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {

    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);

}


export const desconectar = (cliente: Socket, io: SocketIO.Server) =>{
    cliente.on('disconnect',()=>{
        console.log('--- Cliente desconectado !!');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit("usuarios-activos", usuariosConectados.getLista());
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
        
        io.emit("usuarios-activos", usuariosConectados.getLista());

        callback({
            ok: true,
            mensje: `Usuario ${ payload.nombre }, configurado correctamente !!`
        });
    });
}

// obtener-usuario
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit("usuarios-activos", usuariosConectados.getLista());
    });
}