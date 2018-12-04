import { Router, Request, Response } from 'express';

const router = Router();


router.get('/mensajes',(req: Request, res: Response)=>{
    res.status(200).json({
        ok: true,
        mensaje: 'Todo esta bien !!'
    });
});

router.post('/mensajes/:id',(req: Request, res: Response)=>{
    const texto = req.body.prueba;

    res.status(200).json({
        ok: true,
        mensaje: 'Saludos ' + texto + ' !!'
    });
});

export default router;