
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("pessoa")]
public class PessoaControle :ControllerBase
{
    
    //Atributo PessoaRepositorio
    private readonly PessoaRepositorio _pessoaRepositorio;
    //Construtor
    public PessoaControle(PessoaRepositorio pessoaRepositorio)
    {
        _pessoaRepositorio=pessoaRepositorio;
    }
    /*[HttpGet]
  public string? MinhaPrimeiraRota()
    {
        return "Atualizando rota...";
    }

    [HttpPost]
    public Pessoa ManipularEntidadePessoa([FromBody] Pessoa p)
    {
        return p;
    }*/

    //Rota de cadastro
    [HttpPost]
    public IActionResult Cadastrar([FromBody] Pessoa p)
    {
        if(p.Nome == "")
        {
            return BadRequest(new {mensagem = "O nome é obrigatório!"});
        }
        else if(p.Cidade == "")
        {
            return BadRequest(new {mensagem = "A cidade é obrigatório!"});
        }
        else if (p.Idade < 0 || p.Idade > 120)
        {
             return BadRequest(new {mensagem = "A idade precisa estar entre 0 e 120!!"});
        }
        else
        {
            var obj=_pessoaRepositorio.CadastrarPessoa(p);
            return Created(string.Empty, obj);
        }
    }


    //Rota de seleção
    [HttpGet]
    public List<Pessoa> Selecionar()
    {
        return _pessoaRepositorio.SelecionarPessoas();
    }


    //Rota de alteração (localhost:5080/pessoa/1)
    [HttpPut("{codigo}")]
    public Pessoa Alterar(int codigo, [FromBody] Pessoa pessoa)
    {
        pessoa.Codigo = codigo;

        _pessoaRepositorio.AlterarPessoa(pessoa);
        return pessoa;
    }// fim da rota alterar


    //rota de remoção
    [HttpDelete("{codigo}")]
    public void Remover(int codigo)
    {
        _pessoaRepositorio.RemoverPessoa(codigo);
    }


}//fim da classe PessoaControle