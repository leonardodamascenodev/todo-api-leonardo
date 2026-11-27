// SERVICE: a logica de Categoria e o SQL que vai para o banco.
const { db } = require("../config/db");

async function listarcategorias() {
    const [linhas] = await db.query("SELECT * FROM categorias");
    return linhas;
}

async function buscarcategoriaPorId(id) {
    const [linhas] = await db.query("SELECT * FROM categorias WHERE id = ?", [id]);
    return linhas[0];
}

function validarcategoria(dados) {
    if (!dados || !dados.nome) return "O nome e obrigatorio";
    return null;
}

async function criarcategoria(dados) {
    const [resultado] = await db.query("INSERT INTO categorias (nome) VALUES (?)", [
        dados.nome,
    ]);
    return await buscarcategoriaPorId(resultado.insertId);
}

async function deletarcategoria(id) {
    const [resultado] = await db.query("DELETE FROM categorias WHERE id = ?", [id]);
    return resultado.affectedRows > 0;
}

module.exports = {
    validarcategoria,
    listarcategorias,
    buscarcategoriaPorId,
    criarcategoria,
    deletarcategoria,
};