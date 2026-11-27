const express = require("express");
const tarefaRoutes = require("./tarefaRoutes");
const categoriaRoutes = require("./categoriaRoutes");


const router = express.Router();

router.use("/tarefas", tarefaRoutes);
router.use("/categorias", categoriaRoutes);

module.exports = router;
