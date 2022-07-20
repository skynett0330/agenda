const express = require("express");
const router = express.Router();
const pool = require("../database/database");
const contatosController = require('../controllers/ContatosController')

//contatos/
router.get('/list', contatosController.lista)
router.get('/index', contatosController.index)
router.post('/matricula',contatosController.getJoin)
router.post('/inserir', contatosController.salvarContatos)
router.get('/delete/:id?', contatosController.deletOneEv)
router.post('/editar/:id?',contatosController.editar)
router.get('/getId/:id?',contatosController.getIdContatos)
router.get('/telFunc',contatosController.getTelFunc)
router.post('/getUserRegister',contatosController.getUserRegister)
module.exports = router