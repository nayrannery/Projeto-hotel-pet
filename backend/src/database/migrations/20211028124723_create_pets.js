exports.up = function(knex) {
    return knex.schema.createTable('pets', function (table) {
        table.string('id').primary();
        table.string('idUsuario').primary();
        table.string('nome').notNullable();
        table.string('raca').notNullable();
        table.string('tamanho').notNullable();
        table.string('imagem');        
    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('pets');  
};
