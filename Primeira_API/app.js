
import sqlite3 from 'sqlite3';
import express  from 'express';

import { sequelize } from './models.js';

const app = express();

app.use((req, res, next) => {
    console.log('Digite 9 para falar');
    next();
});

app.use((req, res, next) => {
    console.log('Problema resolvido');
    res.send({
        mensagem: 'Problema resolvido' 
    });
});



async function inicializaApp(){

    const db = new sqlite3.Database('./tic.db', (erro) =>{
        if(erro){
            console.log('Erro ao Inicializar o banco de dados');
            
            return;
        }
        console.log('Banco de dados inicializado com sucesso.')
    });

    await sequelize.sync();

    
    
    const porta = 3000;
    
    app.listen(porta)    
}

inicializaApp();


/*function exemploTradicional(){
    console.log('Tradicional')
};

const exemploExpressao = function(){
    console.log('Expressao')
};

const exemploArrow = () => {
    console.log('Arrow')
};*/
