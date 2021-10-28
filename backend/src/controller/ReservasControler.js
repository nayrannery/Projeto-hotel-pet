const crypto = require('crypto');
const connection = require('../database/connections');


module.exports = {

    async list(req,res){
        const users = await connection ('reserva').select('*');
    res.json(users);
        
    },
    

    async show(req,res){
        const {id} = req.params;
        const user = await connection ('reserva')
        .where('id',id)
        .select('*');
    res.json(user);
        
    },


    async create(req,res){
        const {idUsuario,idPets,dataChegada,dataPartida,valorTotal,statusReserva,
            notas,notasFuncionario,recibo,criadoEm,atualizadoEm,imagem 
            } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
    await connection('reserva').insert({
        id,
        idUsuario,
        idPets,
        dataChegada,
        dataPartida,
        valorTotal,
        statusReserva,
        notas,
        notasFuncionario,
        recibo,
        criadoEm,
        atualizadoEm,
        imagem        
    })
        res.json({id})

    },

    async update(req,res){
        const{id} = req.params;
        const {idUsuario,idPets,dataChegada,dataPartida,valorTotal,statusReserva,
            notas,notasFuncionario,recibo,criadoEm,atualizadoEm,imagem} = req.body;
        await connection('reserva').where('id',id).update({
            id,
            idUsuario,
            idPets,
            dataChegada,
            dataPartida,
            valorTotal,
            statusReserva,
            notas,
            notasFuncionario,
            recibo,
            criadoEm,
            atualizadoEm,
            imagem 
        })
        return res.status(204).send();
        
    },

    async delete(req,res){
        const{id} = req.params;
        await connection('reserva').where('id',id).delete({        
        })

        return res.status(204).send();     

    }
}