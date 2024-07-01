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

const Pedido = sequelize.define('pedido', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor_total:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    estado:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

const ProdutosPedido = sequelize.define('produtos_pedido', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    preco:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
});

export async function criaProduto(produto){
    try{
       const result =  await Produto.create(produto);
        console.log(`O produto ${result.nome} foi criado com sucesso!`);
        return result;
    }catch(erro){
        console.log('Erro ao criar produto', erro);
        throw erro;
    }
    
}

export async function listaProduto(){
    try{
        const itens = await Produto.findAll();
        console.log(`Produtos listados com sucesso!`, itens);
        return itens
    }catch(erro){
        console.log('Erro ao ler produto', erro);
        throw erro;
    }
    
}
export async function ListaProdutoPorId(id){
    try{
        const itens = await Produto.findByPk(id);
        console.log(`Produto listado com sucesso!`, itens);
        return itens;
    }catch(erro){
        console.log('Erro ao ler produto', erro);
        throw erro;
    }
    
}
export async function atualizaProduto(id,dadoProduto){
    try{
        const itens = await Produto.update(dadoProduto, {where: { id:id }});
        if(!id.value && !dadoProduto.value){
            
            console.log(`Produto não existe`);
        }else{
            console.log(`Produto atualizado com sucesso!`, itens);
        }

        return itens;
    }catch(erro){
        console.log('Erro ao atualizar produto', erro);
        throw erro;
    }
    
}
export async function deletaProduto(id){
    try{
        const itens = await Produto.destroy({where: { id:id }});
        if(!id.value){
            
            console.log(`Produto não existe`);
        }else{
            
            console.log(`Produto deletado com sucesso!`, itens);
        }
    }catch(erro){
        console.log('Erro ao deletar produto', erro);
        throw erro;
    }
    
}

Produto.belongsToMany(Pedido, { through: ProdutosPedido });
Pedido.belongsToMany(Produto, { through: ProdutosPedido });

export async function criarPedido(novoPedido){
    try {
        const pedido = await Pedido.create({
            valor_total: novoPedido.valorTotal,
            estado: 'ENCAMINHADO'
        });

        for(const prod of novoPedido.produtos){
            const produto = await Produto.findByPk(prod.id);

            if(produto.id.value){
                pedido.addProduto(produto, { through: { quantidade: prod.quantidade, preco: produto.preco } });
            }

        }

        console.log('Pedido criado com sucesso');

        return pedido;

    } catch (erro) {
        console.log('Falha ao Criar Pedido', erro);
        throw erro
    }
}

export async function listaPedido(){
    try {
        const resultado = await ProdutosPedido.findAll();
        console.log('Pedidos foram listados com sucesso!', resultado);
        return resultado;
        
    } catch (erro) {
        console.log('Falha ao Listar Pedidos', erro);
        throw erro
    }
}

export async function listaPedidoPorId(id){
    try {
        const resultado = await Pedido.findByPk(id);
        console.log('Pedido foi listado com sucesso!', resultado);
        return resultado;

    } catch (erro) {
        console.log('Falha ao Listar Pedidos', erro);
        throw erro
    }
}

