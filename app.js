import { Cliente, ClienteService } from "./classes.js";
import { renderizarCliente } from "./utils.js";

const API_URL = "https://crudcrud.com/api/412ca6a758b549c4ade251ced6ea58ec/cliente";
const clienteService = new ClienteService(API_URL);

const form = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");

// Função para atualizar a lista de clientes
async function atualizarLista() {
  listaClientes.innerHTML = "";
  try {
    const clientes = await clienteService.listar();

    clientes
      .map(cliente =>
        renderizarCliente(cliente, async (id) => {
          await clienteService.excluir(id);
          atualizarLista();
        })
      )
      .forEach(li => listaClientes.appendChild(li));
  } catch (erro) {
    console.error("Erro ao carregar clientes:", erro);
  }
}

// Captura evento do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const cliente = new Cliente(nome, email);

  try {
    await clienteService.cadastrar(cliente);
    form.reset();
    atualizarLista();
  } catch (erro) {
    console.error("Erro ao cadastrar cliente:", erro);
  }
});

// Inicializa lista
atualizarLista();
