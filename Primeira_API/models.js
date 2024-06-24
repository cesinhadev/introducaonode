import { Sequelize } from 'sequelize';

export 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './tic.db'
});

sequelize.authenticate();


export const Produto = sequelize.define('produto', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }

});


export async function criaProduto(produto){
    try{
        await Produto.create(produto);
        console.log(`O produto ${produto.nome} foi criado com sucesso!`);
    }catch(erro){
        console.log('Erro ao criar produto', erro);
    }
    
}

export async function listaProduto(){
    try{
        const itens = await Produto.findAll();
        console.log(`Produtos listados com sucesso!`, itens);
    }catch(erro){
        console.log('Erro ao ler produto', erro);
    }
    
}