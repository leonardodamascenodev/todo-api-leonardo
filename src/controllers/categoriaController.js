// CONTROLLER: recebe da rota, chama o service e devolve a resposta.

const categoriaService = require("../services/categoriaService");

async function listar(req, res) {
    const categorias = await categoriaService.listarcategorias(req.query);
    res.status(200).json(categorias);
}

async function buscarPorId(req, res) {
    const categoria = await categoriaService.buscarcategoriaPorId(req.params.id);
    if (!categoria) {
        res.status(404).json({ erro: "categoria nao encontrada" });
        return;
    }
    res.status(200).json(categoria);
}

async function criar(req, res, next) {
    try {
        const erro = categoriaService.validarcategoria(req.body, true);
        if (erro) {
            res.status(400).json({ erro: erro });
            return;
        }

        const novacategoria = await categoriaService.criarcategoria(req.body);
        return res.status(201).json(novacategoria);
    } catch (erro) {
        return next(erro);
    }
}

async function atualizar(req, res, next) {
    try {
        const erro = categoriaService.validarcategoria(req.body, true);
        if (erro) {
            res.status(400).json({ erro: erro });
            return;
        }

        const categoria = await categoriaService.atualizarcategoria(
            req.params.id,
            req.body
        );

        if (!categoria) {
            return res.status(404).json({
                mensagem: "categoria não encontrada."
            });
        }

        return res.status(200).json(categoria);
    } catch (erro) {
        return next(erro);
    }
}

async function atualizarParcial(req, res, next) {
    try {
        const erro = categoriaService.validarcategoria(req.body, false);
        if (erro) {
            res.status(400).json({ erro: erro });
            return;
        }

        const categoria = await categoriaService.atualizarParcialcategoria(
            req.params.id,
            req.body
        );

        if (!categoria) {
            return res.status(404).json({
                mensagem: "categoria não encontrada."
            });
        }

        return res.status(200).json(categoria);
    } catch (erro) {
        return next(erro);
    }
}

async function deletar(req, res, next) {
    try {
        const deletado = await categoriaService.deletarcategoria(req.params.id);

        if (!deletado) {
            return res.status(404).json({
                mensagem: "categoria não encontrada."
            });
        }

        return res.status(204).send();
    } catch (erro) {
        return next(erro);
    }
}



module.exports = { listar, buscarPorId, criar, deletar };
