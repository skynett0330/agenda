const bcrypt = require('bcrypt')
const pool = require('../database/database')
const flash = require('express-flash');
const loginModel = require('../models/loginModel/loginModel')
const userController = {

    // login: async function (req, res, next) {
    //     let errors = []
    //     let { name, password } = req.body


    //     if (!name || typeof name == undefined || name == null) {
    //         errors.push({ message: 'Preencha o nome' })
    //     }
    //     if (!password || typeof password == undefined || password == null) {
    //         errors.push({ message: 'preencha a senha' })
    //     }

    //     if (password.length > 4) {
    //         errors.push({
    //             message: 'A senha deve conter 4 digitos'
    //         })
    //     }

    //     if (errors.length > 0) {
    //         res.render('login/login', { errors })
    //     } else {
    //         res.render('includes/contatos')
    //     }


    // },

    register: async function (req, res) {

        //1passo:declaramos a variaveis
        let { name, matricula, email, password, password2 } = req.body

        let errors = []


        //2passo: ifs de erros
        if (!name || !email || !password || !password2 || !matricula) {
            errors.push({ message: 'Preencha os campos!' });
        }

        if (password.length > 4) {
            errors.push({ message: 'A senha deve conter 4 caractéres' })
        }
        if (password.length < 4) {
            errors.push({ message: 'A senha deve conter 4 caractéres' })
        }

        if (password !== password2) {
            errors.push({ message: 'Senhas não conferem!' });
        }

        //renderizamos a variavel errro na tela register
        if (errors.length > 0) {
            res.render("login/register", { errors });
        } else {

            //4passo: se nao tiver erro, passa pelo if e chega aqui.
            //encriptamos a senha recebida no body
            let hashedPassword = await bcrypt.hash(password, 10);


            //5passo:
            // consulta para saber se existe

            pool.query('select * from agenda.users where email = $1', [email], function (err, results) {
                if (err) {
                    throw err
                } else {

                    if (results.rows.length > 0) {
                        errors.push({ message: "Usuário já existe" })
                        res.render('login/register', { errors })
                    } else {

                        pool.query("insert into agenda.users(name,email,password,matricula)values($1,$2,$3,$4) returning id_user ,password", [name, email, hashedPassword, matricula], function (err, results) {
                            if (err) {
                                throw err
                            } else {
                                req.flash("success_msg", "Cadastrado com sucessso, faça o login!")
                                res.redirect('/')
                            }
                        })
                    }
                }
            })
        }
    },
    add: function (req, res) {
        res.render('login/register')
    },
    logout: function (req, res, next) {
        req.logout()//o o é maiusculo
        req.flash('success_msg', 'você saiu...')
        res.redirect('/')
    },
   
    getAll: function (req, res) {
        loginModel.getAllUser(function (err, results) {
            if (err) {
                throw err
            } else {
                if (results.rows.length > 0) {
                    res.render('modal/userModal', { users: results.rows })
                } else {
                    res.status(404).json("erro ao consultar Usuários")
                }
            }
        })
    },
    delUser: function (req, res) {
        let id = req.params.id
        loginModel.delUser(id, function (err, results) {
            if (err) {
                throw err
            } else {
                if (results.rows.length >= 0) {
                    req.flash('success_msg', 'Excluido com sucesso!')
                    res.redirect('/users/getAll')
                } else {
                    res.status(404).json("Erro ao excluir user")
                }
            }
        })
    }
}


module.exports = userController