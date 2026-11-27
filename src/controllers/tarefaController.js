// CONTROLLER: recebe da rota, chama o service e devolve a resposta.

const tarefaService = require("../services/tarefaService");

async function listar(req, res) {
    const tarefas = await tarefaService.listarTarefas(req.query);
    res.status(200).json(tarefas);
}

async function buscarPorId(req, res) {
    const tarefa = await tarefaService.buscarTarefaPorId(req.params.id);
    if (!tarefa) {
        res.status(404).json({ erro: "Tarefa nao encontrada" });
        return;
    }
    res.status(200).json(tarefa);
}

async function criar(req, res) {
    const novaTarefa = await tarefaService.criarTarefa(req.body);
    res.status(201).json(novaTarefa);
}

async function atualizar(req, res, next) {
    try {
        const tarefa = await tarefaService.atualizarTarefa(
            req.params.id, 
            req.body
        );

        if (!tarefa) {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada."
            });
        }

        return res.status(200).json(tarefa);
    } catch (erro) {
        return next(erro);
    }
}

async function atualizarParcial(req, res, next) {
    try {
        const tarefa = await tarefaService.atualizarParcialTarefa(
            req.params.id, 
            req.body
        );

        if (!tarefa) {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada."
            });
        }

        return res.status(200).json(tarefa);
    } catch (erro) {
        return next(erro);
    }
}

async function deletar(req, res, next) {
    try {
        const deletado = await tarefaService.deletarTarefa(req.params.id);

        if (!deletado) {
            return res.status(404).json({
                mensagem: "Tarefa não encontrada."
            });
        }

        return res.status(204).send();
    } catch (erro) {
        return next(erro);
    }
}


module.exports = { listar, buscarPorId, criar, atualizar, atualizarParcial, deletar };
