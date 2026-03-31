# Sistema de Cadastro de Usuários

Um sistema web completo para gerenciar cadastros de usuários, desenvolvido em JavaScript vanilla com jQuery. Inclui funcionalidades de CRUD (Create, Read, Update, Delete), persistência de dados e tema claro/escuro.

## 📋 Estrutura do Projeto

```
PROJETO JAVASCRIPT/
├── formulariohtml/
│   └── formularioprojeto.html    # Página principal com formulário e tabela
├── projeto.js/
│   ├── main.js                    # Lógica principal e eventos
│   ├── storage.js                 # Gerenciamento de localStorage e cookies
│   └── classes/
│       └── pessoa.js              # Classe modelo para usuário
├── css_do_projeto/
│   └── estiloformulariocss.css    # Estilos com suporte a tema escuro/claro
└── README.md                       # Este arquivo
```

## 📁 Descrição dos Arquivos

### `formularioprojeto.html`
Página HTML principal que contém:
- **Cabeçalho** com título e botões de ação
- **Formulário** para cadastro/edição de usuários com campos:
  - Nome (obrigatório)
  - Email (obrigatório, com sugestões de autocompletar)
  - Senha e Confirmação de Senha (obrigatório)
  - Telefone (opcional)
  - Sexo (Masculino, Feminino, Outro)
  - Curso (Java, JavaScript, Python, C#, PHP)
- **Tabela dinâmica** que exibe todos os usuários cadastrados
- **Botões de ação**: Gravar, Carregar, Cancelar
- **Botões de controle**: Alternar Tema, Excluir Todos

### `main.js`
Arquivo principal com lógica da aplicação:
- **Inicialização**: Carrega tema e desenha a tabela no carregamento
- **Gerenciamento de eventos**: Captura submissão de formulário e cliques de botões
- **CRUD Operations**:
  - **Criar/Atualizar**: Validação de dados e salvamento no localStorage
  - **Ler**: Carrega primeiro registro para edição
  - **Deletar**: Remove registros individuais da tabela
  - **Limpar**: Remove todos os registros
- **Validações**: Confirma se as senhas coincidem
- **UI Updates**: Atualiza automaticamente a tabela após operações

Funções principais:
- `lerDadosFormulario()` - Extrai dados do formulário
- `salvarPessoa(p)` - Salva ou atualiza pessoa no localStorage
- `desenharTabela()` - Renderiza lista de usuários na tabela
- `preencherFormulario()` - Popula formulário para edição
- `aplicarTema()` - Alterna entre tema claro e escuro
- `inicializarTema()` - Carrega tema salvo ao abrir página

### `storage.js`
Módulo responsável pela persistência de dados:
- **localStorage**:
  - `salvarListaPessoas(lista)` - Armazena array de usuários
  - `carregarListaPessoas()` - Recupera usuários salvos
  - `limparTodasPessoas()` - Remove todos os registros
- **Tema**:
  - `salvarTema(tema)` - Salva preferência de tema em localStorage e cookie
  - `carregarTema()` - Recupera tema de localStorage ou cookie
  - `apagarCookieTema()` - Remove cookie de tema

Chaves utilizadas:
- `app_pessoas_v1` - Armazena lista de usuários
- `app_tema_v1` - Armazena preferência de tema (também em cookie com 30 dias de expiração)

### `pessoa.js`
Classe modelo que representa um usuário:

```javascript
new pessoa({
  id: String,           // Gerado automaticamente
  nome: String,         // Obrigatório
  email: String,        // Obrigatório
  senha: String,        // Obrigatório
  telefone: String,     // Opcional
  sexo: String,         // Masculino | Feminino | Outro
  curso: String         // Java | JavaScript | Python | C# | PHP
})
```

**Métodos**:
- `toJSON()` - Converte para objeto plano para armazenamento
- `fromPlain(obj)` - Cria instância a partir de objeto plano
- `gerarId()` - Gera ID único baseado em timestamp e números aleatórios

**Getters/Setters**:
- Todos os campos possuem validação (trim em strings)
- ID é somente leitura

### `estiloformulariocss.css`
Estilos responsivos com tema dinâmico:

**Componentes principais**:
- Header com gradiente cyan/green
- Layout em grid (2 colunas: formulário e tabela)
- Cards com sombras suaves
- Botões com cores específicas (submit=azul, delete=vermelho)
- Tabela com espaçamento adequado
- Suporte completo a tema escuro
- Responsivo para diferentes tamanhos de tela

**Variáveis CSS (temas)**:
- **Light**: Fundo branco, texto escuro, acentos azuis
- **Dark**: Fundo escuro, texto claro, acentos mantidos

## 🚀 Como Usar

### 1. Abrir a Página
Abra `formularioprojeto.html` em um navegador moderno (Chrome, Firefox, Edge, Safari).

### 2. Cadastrar Usuário
1. Preencha todos os campos obrigatórios (Nome, Email, Senha)
2. Confirme a senha no campo de confirmação
3. Preenchidos os campos opcionais se necessário
4. Clique em **Gravar**

### 3. Editar Usuário
1. Clique no botão **Editar** na linha do usuário na tabela
2. Modifique os dados conforme necessário
3. Clique em **Gravar** para atualizar

### 4. Deletar Usuário
- Clique no botão **Deletar** (ícone de lixeira) na linha do usuário

### 5. Outras Ações
- **Alterar Tema**: Clique no botão "Alternar Tema" no cabeçalho
- **Excluir Todos**: Clique em "Excluir Todos" (solicitará confirmação)
- **Cancelar**: Limpa o formulário sem salvar

## 🔧 Requisitos

- Navegador moderno com suporte a:
  - ES6 (import/export)
  - localStorage API
  - Fetch (se expandir para backend)
  - jQuery (incluído no HTML)

## 💾 Persistência de Dados

### localStorage
- Todos os usuários são salvos no `localStorage` do navegador
- Dados persistem entre sessões
- Limite ~5-10MB por domínio

### Cookies
- Tema é salvo também em cookie com validade de 30 dias
- Permite manter preferência mesmo em modo incógnito em alguns navegadores

## 🎨 Temas

O sistema suporta dois temas:

### Tema Claro (Padrão)
- Fundo: Branco (#ffffff)
- Texto: Cinza escuro (#111827)
- Acentos: Azul (#2563eb)

### Tema Escuro
- Fundo: Cinza muito escuro (#0f1724)
- Texto: Branco/Cinza claro
- Acentos: Mantém azul (#2563eb)

Preferência é salva e carregada automaticamente.

## 🔐 Observações de Segurança

⚠️ **Aviso**: Este é um projeto educacional. Em produção:
- Senhas devem ser **hash** no servidor (nunca armazenar em texto plano)
- Usar HTTPS para comunicação
- Implementar autenticação adequada
- Validar dados no servidor, não apenas no cliente
- Implementar CSRF tokens
- Usar biblioteca de validação robusta

## 📦 Dependências

- **jQuery** - Manipulação do DOM e eventos (via CDN no HTML)
- ES6 Modules - Suporte nativo em navegadores modernos

## 🛠️ Possíveis Melhorias

- [ ] Adicionar busca/filtro de usuários
- [ ] Paginação para grandes listas
- [ ] Exportar dados em CSV/JSON
- [ ] Integração com backend (Node.js/Python)
- [ ] Validação de email com regex melhorado
- [ ] Formatação de telefone automática
- [ ] Desfazer/Refazer alterações
- [ ] Modo offline com Service Workers
- [ ] Testes automatizados

## 📄 Licença

Projeto educacional - sinta-se livre para usar e modificar.

## 👤 Autor

Desenvolvido como projeto JavaScript para aprender:
- Manipulação do DOM com jQuery
- Módulos ES6 (import/export)
- Persistência com localStorage
- Validação de formulários
- Padrão Model-View-Controller básico
- Temas dinâmicos com CSS

---

**Última atualização**: Março 2026
