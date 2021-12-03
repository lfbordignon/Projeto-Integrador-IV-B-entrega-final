// Importando o modulo Express
const express = require("express");

// Instanciamiento do Express na variable app
const app = express();
const clientes = require("./clientes.json");
app.use(express.json());



// Dados da Resource, clientes.json.
app.get("/clientes", function (req, res) {

  res.json(clientes);
});

//Dados da resource, desde um ID de clientes.json.
app.get("/clientes/:id", function (req, res) {
  const { id } = req.params;
  const cliente = clientes.find((cli) => cli.id == id);

  if (!cliente) {
    //O ID nao existe, sem conteudo
    return res.status(204).json();
  }
  // Devolve o cliente com o ID seleccionado
  res.json(cliente);
});

// Enviar dados para serem processados por o cliente.json.
app.post("/clientes", function (req, res) {
  const { nome, endereco, cep, nascimento, telefone } = req.body;

  // Salvando dados
  res.json({ nome, endereco, cep, nascimento, telefone});
});

// Atualizar dados de cliente.json.
app.put("/clientes/:id", function (req, res) {
  const { id } = req.params;
  // Procurar o cliente (find) com o ID que esta no parametro
  const cliente = clientes.find((cli) => cli.id == id);

  if (!cliente) {
    //O ID nao existe, sem conteudo
    return res.status(204).json();
  }
  const { nome, endereco, cep, nascimento, telefone} = req.body;
 
  // Pegando os valores do Body
  cliente.nome = nome;
  cliente.endereco = endereco;
  cliente.cep = cep;
  cliente.nascimento = nascimento;
  cliente.telefone = telefone;

  //Devolve o cliente atualizado
  res.json(cliente);
});

// Deletar um cliente com o ID no arquivo clientes.json
app.delete("/clientes/:id", function (req, res) {
  const { id } = req.params;

  //Filtro da lista de clientes o ID  depois de passado pro parametro
  const clienteFiltrado = clientes.filter((cliente) => cliente.id != id);
  //Devovle uma nova lista de clientes, sem o Id que foi digitado an rota
  res.json(clienteFiltrado);
});

// Iniciando o Servidor
app.listen(3000, function () {
  console.log("Server is running");
});
