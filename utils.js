// Função auxiliar para criar elementos com classes e conteúdo
export function criarElemento(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.classes) el.className = options.classes;
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      el.setAttribute(key, value);
    }
  }
  return el;
}

// Função pura para renderizar cliente (não altera estado global)
export function renderizarCliente(cliente, onExcluir) {
  const li = criarElemento("li");

  const infoDiv = criarElemento("div", { classes: "info" });
  const nome = criarElemento("strong", { text: cliente.nome });
  const email = criarElemento("span", { text: cliente.email });

  infoDiv.appendChild(nome);
  infoDiv.appendChild(criarElemento("br"));
  infoDiv.appendChild(email);

  const btnExcluir = criarElemento("button", { text: "Excluir" });
  btnExcluir.addEventListener("click", () => onExcluir(cliente._id));

  li.appendChild(infoDiv);
  li.appendChild(btnExcluir);

  return li;
}
