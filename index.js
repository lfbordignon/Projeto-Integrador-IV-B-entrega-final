const express = require("express");
const app = express();
const router = express.Router();
const file = require('fs');
app.use(express.json({extended: true}));


//Criar uma função de leitura de arquivo
const readFile = () => {
    const conteudo = file.readFileSync('./lista/clientes.json','utf-8');
    return (JSON.parse(conteudo));

}

//Função para escrever arquivo
const writeFile = (arquivo) => {
    const updateFile = JSON.stringify(arquivo);
    file.writeFileSync('./lista/clientes.json', updateFile, 'utf-8');
}

//Rota GET leitura e mostra dados
router.get('/', function(req,res){
    const content = readFile();
    res.send(content);
});

//Rota GET para ler e mostrar dados de um determinado ID
router.get('/:id', function(req,res){
    const {id} = req.params;
    const conteudo = readFile();
    const cliente = conteudo.find(cli => cli.id == id);
    if(!cliente) return res.status(204).json();
    res.send(cliente);
});

//Rota POST inserção de dados
router.post('/', function(req,res){
    const conteudo = readFile();
    const { nome, endereco, cep, data_de_nascimento, telefone} = req.body;
    const id = Math.random().toString(32).substr(2.9);
    conteudo.push({ id, nome, endereco, cep, data_de_nascimento, telefone});
    writeFile(conteudo);
    res.send(conteudo);
});

// Rota PUT é para atualizar dados
router.put('/:id',function(req,res) {
    const {id} = req.params;
    const { nome, endereco, cep, data_de_nascimento, telefone} = req.body;
    const conteudo = readFile();
    const cliente = conteudo.findIndex(cli => cli.id == id);
    const { id: nId, nome: nNome, endereco: nEndereco, cep: nCep, data_de_nascimento: nData_de_nascimento, telefone: nTelefone } = conteudo[cliente];

    const novoObjeto = {
        id: nId,
        nome: nome ? nome : nNome,
        endereco: endereco ? endereco : nEndereco,
        cep: cep ? cep : nCep,
        data_de_nascimento: data_de_nascimento ? data_de_nascimento : nData_de_nascimento,
        telefone: telefone ? telefone : nTelefone,
    };
    conteudo[cliente] = novoObjeto;
    writeFile(conteudo);
    res.send(novoObjeto);
})


// Rota DELETE é para deletar dados
router.delete('/:id',function (req,res) {
    const {id} = req.params;
    const conteudo = readFile();
    const cliente = conteudo.findIndex(cli => cli.id === id );
    if(!cliente) return res.status(204).json('Erro no codigo!');
    conteudo.splice(cliente, 1); // parametro cliente deleta e o nr '1' diz a quantidade
    writeFile(conteudo);
    res.send('Excluído com sucesso!');
})

app.use(router);
app.listen(3000, function(){
    console.log('Servidor na escuta!')
});