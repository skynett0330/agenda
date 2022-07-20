const pool = require("../../database/database");


module.exports = class loginModel{
    static getAllUser(callback){
return pool.query("select * from agenda.users",callback)
    }
    static delUser(id,callback){
        return pool.query("delete from agenda.users where id_user = $1",[id],callback)
    }

}