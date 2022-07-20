const pool = require("../../database/database");

module.exports =  class ContatosModel {

static  insertEv(contatos,callback){
return  pool.query("insert into agenda.contatos(nome,entidade,cargo,endereco,telefone,email,data,obs)values($1,$2,$3,$4,$5,$6,$7,$8)",[contatos.nome,contatos.entidade,contatos.cargo,contatos.endereco,contatos.telefone,contatos.email,contatos.data,contatos.obs],callback)
}
static getAllEv(callback){
  return pool.query("select * from agenda.contatos order  by data asc",callback)
}

static deletOneEv(id,callback){
  return pool.query("delete from agenda.contatos where id_contato = $1",[id],callback)
}
static editar(id,body,callback){
  return pool.query('update agenda.contatos set nome=$1,entidade=$2,data=$3,cargo=$4,endereco=$5,telefone=$6,email=$7,obs=$8 where id_contato =$9',[body.nome, body.entidade,body.data,body.cargo,body.endereco, body.telefone, body.email, body.obs, id],callback)
}
static getIdContatos(id,callback){
  return pool.query("select * from agenda.contatos where id_contato= $1",[id],callback)
}

  static getTodos(callback) {
    return pool.query("select * from mrh.pessoa", callback);
  }

  static getOne(matricula, callback) {
    return pool.query(
      "select * from mrh.pessoa_situacao_atual as psa inner join mrh.pessoa_2 as p on(p.id_pessoa = psa.id_pessoa) inner join mrh.pessoa_contato as pc on (pc.id_pessoa = psa.id_pessoa) where matricula =$1",
      [matricula.mat],
      callback
    );
  }
  static getOneContato(matricula, callback) {
    return pool.query(
      "select * from mrh.pessoa_contato where id_pessoa_contato = $1",
      [matricula],
      callback
    );
  }

  static getContatos(callback) {
    return pool.query(
      "select * from mrh.pessoa_contato where id_pessoa_contato = $1",
      callback
    );
  }

  static getInnerPessoa(callback) {
    return pool.query(
      "select * from mrh.pessoa_2 join mrh.cargo ON mrh.cargo.id_cargo =  CAST ( mrh.pessoa_2.oid_cargo_sgp  AS integer )",
      callback
    );
  }

  static getJoin(matricula,callback){
    return pool.query("select cpf, data_ingresso_sgp::text, data_nasc::text, doador_orgao, doador_sanguineo, fator_rh, fator_sanguineo, matricula_sgp, nome_completo, nome_foto, nome_guerra_sgp, obs_adicional, psa.id_cargo, oid_ome_sgp, oid_pessoa_sgp,  rg_militar_sgp, sexo, id_escolaridade, id_estado_civil, oid_cargo_sgp, oid_quadro_sgp, naturalidade, pf.rg_funcional,pc.telefone_celular,pc.telefone_contato,pc.email_funcional,pc.email_pessoal,c.descricao,c.sigla,pe.cidade,pe.bairro,pe.complemento,pe.logradouro,pe.numero,pe.cep,pe.ponto_referencia "+
    "FROM mrh.pessoa_2 as p "+
    "INNER JOIN  mrh.pessoa_funcional as pf on (p.id_pessoa= pf.id_pessoa)"+
    "INNER JOIN mrh.pessoa_contato as pc on (p.id_pessoa = pc.id_pessoa)"+
    "INNER JOIN mrh.pessoa_endereco as pe on (p.id_pessoa = pe.id_pessoa)"+
    "INNER JOIN mrh.cargo as c on (p.oid_cargo_sgp ::integer = c.id_cargo )"+
    "inner join mrh.pessoa_situacao_atual as psa on(psa.id_pessoa = p.id_pessoa)"+
     "where matricula_sgp =$1 ",[matricula.matricula],callback)
  }
};
