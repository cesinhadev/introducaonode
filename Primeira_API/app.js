const http = require('http');

const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain; charset=utf-8')
    res.end('Olá, TIC em trilha')
});

const porta = 3000;
const host = 'localhost';

servidor.listen(porta,host, () => {
    console.log(`Servidor esta executando em http://${host}:${porta}`);
})


function exemploTradicional(){
    console.log('Tradicional')
};

const exemploExpressao = function(){
    console.log('Expressao')
};

const exemploArrow = () => {
    console.log('Arrow')
};
