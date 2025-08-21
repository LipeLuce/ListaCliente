const API_URL = "https://crudcrud.com/api/412ca6a758b549c4ade251ced6ea58ec/clientes";
const form = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");

// Função para carregar clientes
async function carregarClientes() {
  listaClientes.innerHTML = "";
  try {
    const resposta = await fetch(API_URL);
    const clientes = await resposta.json();

    clientes.forEach(cliente => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="info">
          <strong>${cliente.nome}</strong><br>
          <span>${cliente.email}</span>
        </div>
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      `;
      listaClientes.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar clientes:", erro);
  }
}

// Função para cadastrar cliente
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    });
    form.reset();
    carregarClientes();
  } catch (erro) {
    console.error("Erro ao cadastrar cliente:", erro);
  }
});

// Função para excluir cliente
async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarClientes();
  } catch (erro) {
    console.error("Erro ao excluir cliente:", erro);
  }
}

// Carregar lista ao iniciar
carregarClientes();
