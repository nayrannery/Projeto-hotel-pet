const crypto = require('crypto');
const connection = require('../database/connections');


module.exports = {

    async list(req,res){
        const users = await connection ('pets').select('*');
    res.json(users);
        
    },
    

    async show(req,res){
        const {id} = req.params;
        const user = await connection ('pets')
        .where('id',id)
        .select('*');
    res.json(user);
        
    },


    async create(req,res){
        const {idUsuario,nome,raca,tamanho,imagem} = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
    await connection('pets').insert({
        id,
        idUsuario,
        nome,
        raca,
        tamanho,
        imagem
    })
        res.json({id})

    },

    async update(req,res){
        const{id} = req.params;
        const {idUsuario,nome,raca,tamanho,imagem} = req.body;
        await connection('pets').where('id',id).update({
            id,
            idUsuario,
            nome,
            raca,
            tamanho,
            imagem
        })
        return res.status(204).send();
        
    },

    async delete(req,res){
        const{id} = req.params;
        await connection('pets').where('id',id).delete({        
        })

        return res.status(204).send();     

    }
}