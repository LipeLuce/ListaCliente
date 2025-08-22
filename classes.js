// Classe Cliente
export class Cliente {
  constructor(nome, email, id = null) {
    this.nome = nome;
    this.email = email;
    this._id = id;
  }
}

// Classe ClienteService para lidar com a API
export class ClienteService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async listar() {
    const resposta = await fetch(this.apiUrl);
    const dados = await resposta.json();
    return dados.map(c => new Cliente(c.nome, c.email, c._id));
  }

  async cadastrar(cliente) {
    const { nome, email } = cliente;
    try {
      const resposta = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
      });
      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
      }
      return await resposta.json();
    } catch (erro) {
      console.error("Erro ao cadastrar cliente:", erro);
      throw erro;
    }
  }

  async excluir(id) {
    await fetch(`${this.apiUrl}/${id}`, { method: "DELETE" });
  }
}



