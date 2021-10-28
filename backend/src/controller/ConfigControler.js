const crypto = require('crypto');
const connection = require('../database/connections');


module.exports = {

    async list(req,res){
        const users = await connection ('configuracao').select('*');
    res.json(users);
        
    },
    

    async show(req,res){
        const {id} = req.params;
        const user = await connection ('configuracao')
        .where('id',id)
        .select('*');
    res.json(user);
        
    },


    async create(req,res){
        const {valorDiaria,vagasDisponiveis} = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
    await connection('configuracao').insert({
        id,
        valorDiaria,
        vagasDisponiveis        
    })
        res.json({id})

    },

    async update(req,res){
        const{id} = req.params;
        const {valorDiaria,vagasDisponiveis} = req.body;
        await connection('configuracao').where('id',id).update({
            id,
            valorDiaria,
            vagasDisponiveis 
        })
        return res.status(204).send();
        
    },

    async delete(req,res){
        const{id} = req.params;
        await connection('configuracao').where('id',id).delete({        
        })

        return res.status(204).send();     

    }
}