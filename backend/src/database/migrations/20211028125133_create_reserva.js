exports.up = function(knex) {
    return knex.schema.createTable('reserva', function (table) {
        table.string('id').primary();
        table.string('idUsuario').primary();
        table.string('idPets').primary();
        table.date('dataChegada').notNullable();
        table.date('dataPartida').notNullable();
        table.string('valorTotal').notNullable();
        table.string('status').notNullable();
        table.string('notas');
        table.string('notasFuncionario'); 
        table.string('recibo');
        table.date('criadoEm').notNullable();;
        table.date('atualizadoEm').notNullable();;
        table.string('foto');       
    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('reserva');  
};

