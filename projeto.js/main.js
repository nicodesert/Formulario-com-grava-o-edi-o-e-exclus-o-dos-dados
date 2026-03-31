import { pessoa } from "./classes/pessoa.js";
import * as storage from "./storage.js";

$(function () {
  const $form = $("#formPessoa");
  const $tbl = $("#tblPessoas tbody");

  inicializarTema();
  desenharTabela();

  $form.on("submit", function (e) {
    e.preventDefault();

    try {
      const pessoa = lerDadosFormulario();
      salvarPessoa(pessoa);
      limparFormulario();
      desenharTabela();
      alert("Usuário salvo!");
    } catch (err) {
      alert(err.message);
    }
  });

  $("#btnCancelar").on("click", limparFormulario);

  $("#btnLimparTudo").on("click", function () {
    if (confirm("Deseja apagar tudo?")) {
      storage.limparTodasPessoas();
      desenharTabela();
    }
  });

  $("#btnCarregar").on("click", function () {
    const lista = storage.carregarListaPessoas();
    if (lista.length === 0) return alert("Nenhum registro.");

    preencherFormulario(pessoa.fromPlain(lista[0]));
  });

  $("#btnTema").on("click", function () {
    const temaAtual = $("body").hasClass("dark") ? "dark" : "light";
    const novoTema = temaAtual === "dark" ? "light" : "dark";

    aplicarTema(novoTema);
    storage.salvarTema(novoTema);
  });

  function lerDadosFormulario() {
    const id = $("#pessoaId").val() || null;
    const nome = $("#nome").val();
    const email = $("#email").val();
    const senha = $("#senha").val();
    const confirmarSenha = $("#confirmarSenha").val();
    const telefone = $("#telefone").val();
    const sexo = $('input[name="sexo"]:checked').val() || '';
    const curso = $("#curso").val();

    if (senha !== confirmarSenha) {
      throw new Error("As senhas não coincidem.");
    }

    return new pessoa({ id, nome, email, senha, telefone, sexo, curso });
  }

  function salvarPessoa(p) {
    let lista = storage.carregarListaPessoas();
    const i = lista.findIndex(x => x.id === p.id);

    if (i >= 0) lista[i] = p.toJSON();
    else lista.push(p.toJSON());

    storage.salvarListaPessoas(lista);
  }

  function desenharTabela() {
    const lista = storage.carregarListaPessoas();
    $tbl.empty();

    if (lista.length === 0) {
      $("#tblPessoas").hide();
      $("#mensagemNenhum").show();
      return;
    }

    $("#mensagemNenhum").hide();
    $("#tblPessoas").show();

    for (const obj of lista) {
      const p = pessoa.fromPlain(obj);

      const $tr = $(`
        <tr>
          <td>${p.nome}</td>
          <td>${p.email}</td>
          <td>${p.telefone}</td>
          <td>${p.sexo}</td>
          <td>${p.curso}</td>
          <td>
            <button class="acao-edit">Editar</button>
            <button class="acao-delete">Excluir</button>
          </td>
        </tr>
      `);

      $tr.find(".acao-edit").on("click", () => preencherFormulario(p));
      $tr.find(".acao-delete").on("click", () => excluirPessoa(p.id));

      $tbl.append($tr);
    }
  }

  function preencherFormulario(p) {
    $("#pessoaId").val(p.id);
    $("#nome").val(p.nome);
    $("#email").val(p.email);
    $("#senha").val(p.senha);
    $("#confirmarSenha").val(p.senha);
    $("#telefone").val(p.telefone);
     if (p.sexo) {
      $(`input[name="sexo"]`).prop('checked', false);
      $(`input[name="sexo"][value="${p.sexo}"]`).prop("checked", true);
    } else {
      $(`input[name="sexo"]`).prop('checked', false);
    }
    $("#curso").val(p.curso);
  }

  function limparFormulario() {
    $("#pessoaId").val("");
    $form[0].reset();
  }

  function excluirPessoa(id) {
    let lista = storage.carregarListaPessoas();
    lista = lista.filter(p => p.id !== id);
    storage.salvarListaPessoas(lista);
    desenharTabela();
  }

  function inicializarTema() {
    aplicarTema(storage.carregarTema());
  }

  function aplicarTema(tema) {
    const escuro = tema === "dark";
    $("html, body").toggleClass("dark", escuro);
    $(".app-root").toggleClass("dark", escuro);
    $("#btnTema").text(escuro ? "Tema Claro" : "Tema Escuro");
  }
});
