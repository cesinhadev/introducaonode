import express from "express";

import { sequelize, criaProduto, leProdutos, leProdutoPorId, atualizaProdutoPorId, deletaProdutoPorId } from  '../models.js';

export const rotasProduto = express.Router();

rotasProduto.post('/produtos' , async(req,res,next) =>{
    const produto = req.body;

    res.statusCode = 400;

    if(!produto?.nome) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'nome' não foi encontrado, porém é obrigatório para a criação do produto`
            }
        };

        res.send(resposta);

        return;
    }

    if(!produto?.preco) {
        const resposta = {
            erro: {
                mensagem: `O atributo 'preco' não foi encontrado, porém é obrigatório para a criação do produto`
            }
        };

        res.send(resposta);

        return;
    }
    try {
        const resposta = await criaProduto(produto);

        res.statusCode = 201;

        res.end(JSON.stringify(resposta));

        return;
    } catch (erro) {
        console.log('Falha ao criar o produto', erro);

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao criar o produto ${produto.nome}`
            }
        };

        res.send(resposta);

        return;
    }
});

req.on('error', (erro) => {
    console.log('Falha ao processar a requisição', erro);

    res.statusCode = 400;

    const resposta = {
        erro: {
            mensagem: 'Falha ao processar a requisição'
        }
    };

    res.send(resposta);

    return;
});

// atualiza Produto

rotasProduto.patch('/produtos/:id' ,async(req,res,next) =>{
    const produto = req.body;

    res.statusCode = 400;

    if(!produto?.nome && !produto.preco){
        const resposta  = {
            erro:{
                mensagem: `Nenhum atributo foi encontrado, porém ao menos um é obrigatório para a atualização do produto`
            }
        };

        return res.send(resposta);
    }

    const id = req.params.id;

    try{
        const resposta = await atualizaProdutoPorId(id, produto);

        res.statusCode = 200;

        if (!resposta) {
            res.statusCode = 404;
        }

        res.send(resposta);
    }catch(erro){
        console.log('Falha ao atualizar o produto', erro);

        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao atualizar o produto ${produto.nome}`
            }
        };

        res.send(resposta)
    }
});

// Deletar o produto

rotasProduto.delete('/produtos/:id' ,async(req,res,next) =>{
    const id = req.params.id;

    try {
        const encontrado = await deletaProdutoPorId(id);

        res.statusCode = 204;

        if (!encontrado) {
            res.statusCode = 404;
        }

        res.send();
    } catch (erro) {
        console.log('Falha ao remover produto', erro);
        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao remover produto ${id}`
            }
        };

        res.send(resposta);
    }

});

// Pesquisa por id do produto

rotasProduto.get('/produtos/:id' ,async(req,res,next) =>{

    const id = req.params.id;

    try {
        const resposta = await leProdutoPorId(id);

        res.statusCode = 200;
        
        if(!resposta){
            
            res.statusCode = 404;
        }

        res.send(resposta);

    } catch (erro) {
        console.log('Falha ao buscar o produto', erro);
        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao buscar produto ${id}`
            }
        };

        res.send(resposta);
    }

});

// Listagem de todos os produtos

rotasProduto.get('/produtos' ,async(req,res,next) =>{
    
    try {
        const resposta = await leProdutos();

        res.statusCode = 200;

        res.send(resposta);

    } catch (erro) {
        console.log('Falha ao listar produtos', erro);
        res.statusCode = 500;

        const resposta = {
            erro: {
                mensagem: `Falha ao listar os produtos`
            }
        };

        res.send(resposta);
    }
});