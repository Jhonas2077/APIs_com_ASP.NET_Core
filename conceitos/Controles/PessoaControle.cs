
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
    public Pessoa Cadastrar([FromBody] Pessoa p)
    {
        var obj = _pessoaRepositorio.CadastrarPessoa(p);
        return obj;
    }

    //Rota de seleção
    [HttpGet]
    public List<Pessoa> Selecionar()
    {
        return _pessoaRepositorio.SelecionarPessoas();
    }
}//fim da classe PessoaControle