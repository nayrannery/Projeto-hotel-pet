const express = require('express');
const routes = express.Router();
const UserController = require('./controller/UserControler');
const ConfigController = require('./controller/ConfigControler');
const PetsController = require('./controller/PetsControler');
const ReservasController = require('./controller/ReservasControler');

routes.get('/users',UserController.list);
routes.get('/users/:id',UserController.show);
routes.post('/users',UserController.create);  
routes.post('/users/pesquisar',UserController.search);  
routes.put('/users/:id',UserController.update);
routes.delete('/users/:id',UserController.delete);

routes.get('/pets',PetsController.list);
routes.get('/pets/:id',PetsController.show);
routes.post('/pets',PetsController.create);  
routes.post('/pets/pesquisar',PetsController.search);  
routes.put('/pets/:id',PetsController.update);
routes.delete('/pets/:id',PetsController.delete);

routes.get('/reserva',ReservasController.list);
routes.get('/reserva/:id',ReservasController.show);
routes.post('/reserva',ReservasController.create);  
routes.post('/reserva/pesquisar',ReservasController.search);  
routes.put('/reserva/:id',ReservasController.update);
routes.delete('/reserva/:id',ReservasController.delete);

routes.get('/configuracao',ConfigController.list);
routes.get('/configuracao/:id',ConfigController.show);
routes.post('/configuracao',ConfigController.create);  
routes.put('/configuracao/:id',ConfigController.update);
routes.delete('/configuracao/:id',ConfigController.delete);

/***
 * GET: Buscar / listar uma informação no backend
 * POST: Criar uma informação no backend
 * PUT: Alterar as informações no backend
 * DELETE: Apagar informações no backend
 * Request Body parametros para identificação do recurso 
 * Query: Parametros nomeados enviados na rota apos simbolo?
 * Request body: corpo da requisição: nome, email, cpf
 */

        

/*** 
routes.post('/user', (req, res) => {
    const params = req.body;
    console.log(params)
        res.json({
            id: '1234'            
        })
})

routes.post('/user/:id', (req, res) => {
    const params = req.params;
    console.log(params)
        res.json({
            Mensagem: 'Sucesso'            
        })
})
*/


module.exports = routes;