import { Router, Request, Response } from 'express';
import Server from '../clases/server';
import { SERVER_PORT } from '../global/environment';

const router = Router();


router.get('/mensajes',(req: Request, res: Response)=>{
    res.status(200).json({
        ok: true,
        mensaje: 'Todo esta bien !!'
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
    const id = req.body.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado',payload);

    res.status(200).json({
        ok: true,
        //mensaje: 'Saludos ' + texto + ' !!'
    });
});

export default router;