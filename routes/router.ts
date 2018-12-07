import { Router, Request, Response } from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();


router.get('/mensajes',(req: Request, res: Response)=>{
    res.status(200).json({
        ok: true,
        mensaje: 'Todo esta bien !!'
    });
});

router.get('/usuarios',(req: Request, res: Response)=>{
    //
    const server = Server.instance;
    //
    server.io.clients((err: any, clientes: string[])=>{
        if(err){
            return res.json({
                ok: true,
                err
            });
        }
        //
        res.json({
            ok: true,
            clientes
        });
    });
});


router.post('/mensajes',(req: Request, res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    
    const payload = { de, cuerpo}

    const server = Server.instance;
    
    server.io.emit('mensaje-nuevo',payload);
    
    res.status(200).json({
        ok: true,
        payload
    });
});



router.post('/mensajes/:id',(req: Request, res: Response)=>{
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',payload);

    res.status(200).json({
        ok: true,
        id,
        payload
        //mensaje: 'Saludos ' + texto + ' !!'
    });
});

// obtener usarios y sus nombres
router.get('/usuarios/detalle',(req: Request, res: Response)=>{
    //
    const clientes = usuariosConectados.getLista();
    //
    res.json({
        ok: true,
        clientes
    });
});

export default router;