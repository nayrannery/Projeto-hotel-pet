const crypto = require('crypto');
const connection = require('../database/connections');


module.exports = {

    async list(req, res) {
        const users = await connection('users').select('*');
        res.json(users);

    },


    async show(req, res) {
        const { id } = req.params;
        const user = await connection('users')
            .where('id', id)
            .select('*');
        res.json(user);

    },


    async create(req, res) {
        const { nome,senha,email,telefone,funcao,imagem,dataCriacao,statusUsuario } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('users').insert({
            id,
            nome,
            senha,
            email,
            telefone,
            funcao,
            imagem,
            dataCriacao,
            statusUsuario
        })
        res.json({ id })

    },

    async update(req, res) {
        const { id } = req.params;
        const { nome,senha,email,telefone,funcao,imagem,dataCriacao,statusUsuario } = req.body;
        await connection('users').where('id', id).update({
            id,
            nome,
            senha,
            email,
            telefone,
            funcao,
            imagem,
            dataCriacao,
            statusUsuario
        })
        return res.status(204).send();

    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('users').where('id', id).delete({
        })

        return res.status(204).send();

    }
}