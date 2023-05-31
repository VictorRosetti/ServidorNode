var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var DBPATH = 'seuBD.db';
var db = new sqlite3.Database(DBPATH);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.send("Salvei aqui!");
});

app.get("/tudo", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    db.all(`SELECT * FROM usuarios`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(err);
        }
        res.send(rows);
    });
});

app.post("/criarUsuario", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    var cpf = req.body.cpf;
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    sqlBusca=`SELECT * FROM usuarios WHERE cpf=${cpf}`;
    db.all(sqlBusca, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na busca"+err);
        }else
        {
            if(rows.length>0)
            {
                res.send("Usuário já existe!");
            }else
            {
                sql = `INSERT INTO usuarios (cpf,nome,endereco) VALUES (${cpf},"${nome}","${endereco}")`
                db.all(sql, [], (err, rows)=>
                {
                    if(err)
                    {
                        res.send("Erro na gravação: "+err);
                    }else
                    {
                        res.send("Usuário cadastrado!");
                    }
                });
            }
        }
    })
    
});
app.put("/atualizaUsuario", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var cpf = req.body.cpf;
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    var teste=false;
    sql=`UPDATE usuarios SET `;
    if(req.body.nome)
    {
        sql += `nome="${nome}" `;
        teste=true;
    }
    if((req.body.endereco)&&(teste==true))
    {
        sql +=`,endereco=${endereco} `;
    }else
    {
        sql +=`endereco=${endereco} `;
    }
    sql+=  `WHERE cpf=${cpf}`;
    //sql = `UPDATE usuarios SET nome="${nome}", endereco="${endereco}" WHERE cpf=${cpf}`
    sql = `UPDATE usuarios SET endereco="${endereco}" WHERE cpf=${cpf}`
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na atualização: "+err);
        }else
        {
            res.send("Usuário atualizado!");
        }
    });
});

function intervalFunc() {
    console.log('Cant stop me now!');
  }
  
  //setInterval(intervalFunc, 1500);


app.listen(port, () => 
{
    console.log(`Servidor rodando na porta ${port}`);
})