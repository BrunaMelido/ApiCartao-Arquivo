const express = require("express");
const app = express();

const PORT = 5500;

app.use(express.json());

const conn = require("./db/conn");
conn();

// Exemplo de arquivo
// const arquivo = `0020230619000001
// 0120230619000124001500000002563762566610282LUIS FABIO SOBRAL MAGALHAES             L FABIO S MAGALHAES                     1555875201
// 0220230619000125001500000002800101000025
// 0320230619000126001500000002800111000025
// 992023061900000005`;
// const arquivo = "0020230619000001";
// const arquivo = "0120230619000124001500000002563762566610282LUIS FABIO SOBRAL MAGALHAES             L FABIO S MAGALHAES                     1555875201   "
// const arquivo = "0220230619000125001500000002800101000025"
const arquivo = "0320230619000126001500000002800111000025"

// Quebrar o arquivo em linhas
const linhas = arquivo.split("\n");

// Processar cada linha do arquivo
linhas.forEach((linha) => {
  processarLinha(linha.trim());
});

// Função para processar cada linha do arquivo
function processarLinha(linha) {
  const indicadorTipo = linha.substring(0, 2);

  if (indicadorTipo == "00") {
    console.log("HEADER");
    processarHeader(linha);
  } else if (indicadorTipo == "01") {
    console.log("SOLICITAÇÃO DE CARTÃO");
    processarSolicitacaoCartao(linha);
  } else if (indicadorTipo == "02") {
    console.log("Solicitação de Bloqueio");
    processarSolicitacaoBloqueio(linha);
  } else if (indicadorTipo == "03") {
    console.log("Solicitação de Cancelamento");
    processarSolicitacaoCancelamento(linha);
  } else if (indicadorTipo == "99") {
    console.log("Trailler de fim de arquivo");
    processarTrailler(linha);
  } else {
    console.log("Tipo desconhecido");
  }
}

// Função para processar o registro de HEADER
function processarHeader(linha) {
  const indicadorTipo = linha.substring(0, 2);
  const dataArquivo = linha.substring(2, 10);
  const codigoRemetente = linha.substring(10, 16);

  console.log(`Indicador do Tipo:                               ${indicadorTipo}`);
  console.log(`Data Arquivo:                                    ${dataArquivo}`);
  console.log(`Codigo remetente:                                ${codigoRemetente}`);
}

// Função para processar o registro de Solicitação de Cartão
function processarSolicitacaoCartao(linha) {
  const indicadorTipo = linha.substring(0, 2);
  const dataSolicitacao = linha.substring(2, 10);
  const idTransacao = linha.substring(10, 16);
  const agenciaConta = linha.substring(16, 20);
  const numeroConta = linha.substring(20, 32);
  const cpfCliente = linha.substring(32, 43);
  const nomeCliente = linha.substring(43, 83);
  const nomeCartao = linha.substring(83, 123);
  const diaVencimento = linha.substring(123, 125);
  const senhaNumerica = linha.substring(125, 133);

  console.log(`Indicador do Tipo:                               ${indicadorTipo}`);
  console.log(`Data Solicitação:                                ${dataSolicitacao}`);
  console.log(`Id da transação:                                 ${idTransacao}`);
  console.log(`Agencia da conta:                                ${agenciaConta}`);
  console.log(`Numero da Conta:                                 ${numeroConta}`);
  console.log(`CPF cliente:                                     ${cpfCliente}`);
  console.log(`Nome do Cliente:                                 ${nomeCliente}`);
  console.log(`Nome no Cartão:                                  ${nomeCartao}`);
  console.log(`Dia vencimento:                                  ${diaVencimento}`);
  console.log(`Senha numérica:                                  ${senhaNumerica}`);
  
}

// Função para processar o registro de Solicitação de Bloqueio
function processarSolicitacaoBloqueio(linha) {
  const indicadorTipo = linha.substring(0, 2);
  const dataBloqueio = linha.substring(2, 10);
  const idTransacao = linha.substring(10, 16);
  const agenciaConta = linha.substring(16, 20);
  const numeroConta = linha.substring(20, 35);
  const motivo = linha.substring(35, 37);
  const idOperadorAcao = linha.substring(37, 43);

  console.log(`Indicador do Tipo:                                 ${indicadorTipo}`);
  console.log(`Data Bloqueio:                                     ${dataBloqueio}`);
  console.log(`Id da transação:                                   ${idTransacao}`);
  console.log(`Agencia da conta:                                  ${agenciaConta}`);
  console.log(`Numero da Conta:                                   ${numeroConta}`);
  console.log(`Motivo:                                            ${motivo}`);
  console.log(`Id Operador da Ação:                               ${idOperadorAcao}`);
  
}

// Função para processar o registro de Solicitação de Cancelamento
function processarSolicitacaoCancelamento(linha) {
  const indicadorTipo = linha.substring(0, 2);
  const dataCancelamento = linha.substring(2, 10);
  const idTransacao = linha.substring(10, 16);
  const agenciaConta = linha.substring(16, 20);
  const numeroConta = linha.substring(20, 35);
  const motivo = linha.substring(35, 37);
  const idOperadorAcao = linha.substring(37, 43);

  console.log(`Indicador do Tipo:                                 ${indicadorTipo}`);
  console.log(`Data Cancelamento:                                 ${dataCancelamento}`);
  console.log(`Id da transação:                                   ${idTransacao}`);
  console.log(`Agencia da conta:                                  ${agenciaConta}`);
  console.log(`Numero da Conta:                                   ${numeroConta}`);
  console.log(`Motivo:                                            ${motivo}`);
  console.log(`Id Operador da Ação:                               ${idOperadorAcao}`);
}

// Função para processar o registro de Trailler de fim de arquivo
function processarTrailler(linha) {
  const indicadorTipo = linha.substring(0, 2);
  const dataArquivo = linha.substring(2, 10);
  const totalRegistros = linha.substring(10, 18);

  console.log(`Indicador do Tipo:                                 ${indicadorTipo}`);
  console.log(`Data Arquivo:                                      ${dataArquivo}`);
  console.log(`Total de registros contando Header e Trailler:     ${totalRegistros}`);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema({
  indicadorTipo: String,
  dataArquivo: String,
  codigoRemetente: String,
});

const Header = mongoose.model("Header", headerSchema);

module.exports = Header;