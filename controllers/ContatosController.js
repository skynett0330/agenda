const express = require("express");
const pool = require("../database/database");
const router = express.Router();
const flash = require('express-flash')
const ContatosModel = require("../models/contatos/ContatosModel");
const loginModel = require('../models/loginModel/loginModel')
const contatosController = {

  getJoin: function (req, res) {

    let matricula = req.body

    ContatosModel.getJoin(matricula, function (err, results) {
      if (err) {
        throw err
      } else {
        res.render("includes/contatosId", {
          datas: results.rows
        })

      }
    })
  },

  index: function (req, res) {
    res.render("includes/contatos", { user: req.user.name })

  },

  //TRAZ TODO MUNDO DO BANCO NA LISTA
  lista: function (req, res) {
    ContatosModel.getAllEv(function (err, results) {
      if (err) {
        throw err
      } else {
        res.render('includes/lista', { dados: results.rows })
      }
    })

  },
  salvarContatos: function (req, res) {


    ContatosModel.insertEv(req.body, function (err, results) {
      if (err) {
        throw err
      } else {
        req.flash('success_msg', 'Adcionado com sucesso!')
        res.redirect('/contatos/list')
        console.log('inserido com sucesso')
      }
    })

  },
  deletOneEv: function (req, res) {
    let id = req.params.id;
    ContatosModel.deletOneEv(id, function (err, results) {
      if (err) {
        throw err
      } else {
        if (results.rows.length >= 0) {
          req.flash('success_msg', 'deletado!')
          res.redirect('/contatos/list')
        } else {
          res.status(404).json('erro ao deletar')
        }
      }
    })
  },
  editar: async function (req, res) {
    let id = req.params.id
    let body = req.body
    ContatosModel.editar(id, body, function (err, results) {
      if (err) {
        throw new err
      } else {

        req.flash('success_msg', 'Editado com sucesso!')
        res.redirect('/contatos/list')

      }
    })
  },
  getIdContatos: async function (req, res) {
    let id = req.params.id
    await ContatosModel.getIdContatos(id, function (err, results) {
      if (err) {
        throw err
      } else {
        res.render('modal/editContato', { datas: results.rows })
      }
    })
  },
  getTelFunc: function (req, res) {
    res.render('includes/telFunc')
  },
  getUserRegister: async function (req, res) {

    let mat = req.body
    errors = []

    if (mat == "") {
      errors.push({ message: 'digite a matricula' })
      res.render('login/register', { errors })
    } else {

      ContatosModel.getOne(mat, function (err, results) {
        if (err) {
          throw err
        } else {

          res.render('login/register', { dados: results.rows })

        }
      })
    }
  }

}
module.exports = contatosController