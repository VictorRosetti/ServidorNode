$(document).ready(function()
{
    $.get("http://127.0.0.1:3000/tudo", function(resultado)
    {
        console.log(resultado);
        for(let i=0; i<4; i++)
        {
            $("#cpf").append(`${resultado[i].cpf}<br>`);
            $("#nome").append(`${resultado[i].nome}<br>`);
            $("#endereco").append(`${resultado[i].endereco}<br>`);
        }
        
    });
});

function CriaUsuario()
{
    var cpf = parseInt($("#recebeCPF").val());
    var nome = $("#recebeNome").val();
    var endereco = $("#recebeEndereco").val();
    $("#recebeCPF").val("NOME VAI AQUI!");
    var json = {
                "cpf":cpf,
                "nome":nome,
                "endereco":endereco
                }
    console.log(json);
    $.post("http://127.0.0.1:3000/criarUsuario", json, function(resultado)
    {
        console.log(resultado);
        $("#resposta").append(resultado);
        $("#resposta").val(resultado);
        /*if(resultado=="Usuário cadastrado!")
        {
            window.location="teobaldo2.html";
        }*/
    })
}