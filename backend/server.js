// importando os modulos das dependencias
const express = require("express");
const cors = require("cors");
// criando a instancia da aplicacao express
const app = express();

//defindo a porta aplicacao que ira executar
const port = 5001;

//confirgurar express para receber json
app.use(express.json());

//habilita o cor para aceitar requisicoes da aplicacao
app.use(cors());

//tabela de precos
const precos = {
    bicicleta: 0.80,
    carro: 0.95,
    drone: 1.20,
};

// criando a rota da aplicacao
app.post("/calcularFrete", (req, res) => {
    //desestruturacao para extrair as variaveis da aplicacao
    const { distancia, tipoTransporte } = req.body;

    if ( distancia === undefined || tipoTransporte === undefined ) {
        return res.status(400).json ({ error:"distancia e transpote obrigatorios"});
    }

    const precoPorKM = precos[tipoTransporte.toLowerCase()];
    if (precoPorKM === undefined) {
        return res.status(400).json({ error: "tipo de transporte invalido" });
    }

    //calcular o valor total do frete
    const valorTotal = distancia * precoPorKM;

    res.json({valorTotal: valorTotal.toFixed(2)})//arrenda pra duas casa decimais
});

app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
});