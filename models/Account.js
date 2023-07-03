const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    indicadorTipo: String,
    dataArquivo: String,
    codigoRemetente: String,
    dataSolicitacao: String,
    idTransacao: String,
    agenciaConta: String,
    numeroConta: String,
    cpfCliente: String,
    nomeCliente: String,
    nomeCartao: String,
    diaVencimento: String,
    senhaNumerica: String,
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
