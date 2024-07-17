import sqlite3 from 'sqlite3';
import express  from 'express';
import bodyParser  from "body-parser";

import { rotasProduto } from './routes/produtos.js'

import { sequelize } from './models.js';

const app = express();

app.use(bodyParser.json());

app.use(rotasProduto);



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
