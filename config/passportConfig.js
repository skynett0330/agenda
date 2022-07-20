const localStrategy = require('passport-local').Strategy;
const pool = require('../database/database')
const bcrypt = require('bcrypt')

//funcao que inicia o localstrategy com initialize passando a funcao por parametro
//instalamos o local-passport
function initialize(passport) {

    const authenticateUser = (email, password, done) => {
            
        pool.query("select * from agenda.users where email = $1", [email], function (err, results) {

            if (err) {
                throw err
            }
            // console.log(results.rows)
            if (results.rows.length > 0) {

                const user = results.rows[0] // a variavel user recebe o resultado da query

                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) {
                        throw err
                    }

                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: "Senha incorreta!" })
                    }
                })

            } else {
                return done(null, false, { message: "Email não registrado!" })
            }
        })
    }


    passport.use(
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            authenticateUser
        )
    )


    //dizemos para o passporte serializar
    passport.serializeUser((user, done) => done(null, user.id_user))

    //faresmos ele dsserializar
    passport.deserializeUser((id_user, done) => {

        //fazemos uma consulta ao banco
        pool.query("select * from agenda.users where id_user =$1", [id_user], function (err, results) {
            if (err) {
                throw err
            }
            return done(null, results.rows[0])
        })

    })
}


module.exports = initialize