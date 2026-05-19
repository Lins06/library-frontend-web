# 📚 Library Frontend - Aplicação Web de Biblioteca

Uma aplicação web moderna e responsiva para gerenciamento de biblioteca, desenvolvida com **React** e **Vite**. A aplicação oferece autenticação de usuários, gerenciamento de livros e uma experiência de usuário intuitiva e acessível.

## ✨ Características Principais

### 🔐 Autenticação e Segurança
- ✅ **Login seguro** com validação de email e senha
- ✅ **Registro de usuários** com integração de CEP (ViaCEP)
- ✅ **Gerenciamento de sessão** com tokens JWT no localStorage
- ✅ **Rotas protegidas** que verificam autenticação
- ✅ **Logout funcional** com redirecionamento para login

### 📖 Gerenciamento de Livros
- ✅ **Listagem de livros** em grid responsivo
- ✅ **Busca em tempo real** por título de livro
- ✅ **Adicionar novos livros** com formulário intuitivo
- ✅ **Editar livros** existentes
- ✅ **Deletar livros** com confirmação
- ✅ **Visualizar detalhes** completos de cada livro
- ✅ **Preview de capa** do livro (com URL da imagem)
- ✅ **Barra de progresso** de leitura

### 📱 Design Responsivo
- ✅ **Desktop** (1024px+) - Layout completo com sidebar fixa
- ✅ **Tablet** (768px - 1024px) - Sidebar horizontal no topo
- ✅ **Mobile** (480px - 768px) - Layout mobile otimizado
- ✅ **Extra Small** (<480px) - Versão ultra compacta

### 🎨 Interface Moderna
- ✅ Design limpo e intuitivo
- ✅ Paleta de cores azul coerente (#0073B1, #2563eb)
- ✅ Ícones intuitivos com lucide-react
- ✅ Transições suaves (0.2s)
- ✅ Feedback visual claro (hover, focus, disabled states)
- ✅ Mensagens de erro e sucesso

## 🛠️ Stack Tecnológico

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend Framework** | React 19.2.5 |
| **Build Tool** | Vite 8.0.10 |
| **Roteamento** | React Router DOM 7.15.0 |
| **HTTP Client** | Axios 1.16.1 |
| **Ícones** | Lucide React 1.14.0 |
| **Linguagem** | JavaScript/JSX |
| **CSS** | CSS3 com Media Queries |
| **Linting** | ESLint 10.2.1 |

## 📋 Pré-requisitos

- **Node.js** 16.0.0 ou superior
- **npm** 8.0.0 ou superior
- **Backend API** rodando em `http://localhost:8080`

### 3. Configurar URL da API

O arquivo `src/services/api.js` já está configurado para conectar ao backend local:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080' 
});
```

Se precisar mudar a URL, edite este arquivo.

## 🏃 Executar a Aplicação

### Modo de Desenvolvimento
```bash
npm run dev
```
A aplicação será aberta em `http://localhost:5174` (ou próxima porta disponível)

### Build para Produção
```bash
npm run build
```
Gera otimizações e minificação em `dist/`

### Preview da Build
```bash
npm run preview
```
Visualiza a build de produção localmente

### Lint
```bash
npm run lint
```
Verifica problemas de código com ESLint

## 📁 Estrutura do Projeto

```
src/
├── pages/                    # Páginas principais
│   ├── Login.jsx            # Página de login
│   ├── Register.jsx         # Página de registro
│   ├── Dashboard.jsx        # Dashboard com listagem de livros
│   ├── BookForm.jsx         # Formulário para adicionar/editar livro
│   └── BookDetails.jsx      # Página de detalhes do livro
│
├── components/              # Componentes reutilizáveis
│   ├── Navbar.jsx          # Barra de navegação
│   ├── BookCard.jsx        # Card individual de livro
│   └── ProtectedRoute.jsx  # Componente para rotas protegidas
│
├── context/                 # Context API
│   └── AuthContext.jsx     # Contexto de autenticação
│
├── hooks/                   # Custom Hooks
│   ├── useAuth.js          # Hook para autenticação
│   └── useBooks.js         # Hook para operações com livros
│
├── services/                # Serviços de API
│   └── api.js              # Configuração do Axios
│
├── styles/                  # Arquivos CSS
│   ├── Login.css           # Estilos de login/registro
│   ├── Dashboard.css       # Estilos do dashboard
│   ├── BookForm.css        # Estilos do formulário
│   ├── BookDetails.css     # Estilos dos detalhes
│   └── Globals.css         # Estilos globais
│
├── App.jsx                  # Componente raiz
├── main.jsx                 # Ponto de entrada
└── index.html               # HTML template
```

## 🔄 Fluxo da Aplicação

### 1️⃣ Autenticação
```
Login → API (/api/auth/login) → Token salvo
            ↓
          Dashboard
```

### 2️⃣ Registro
```
Register → Busca CEP (/api/auth/address/{cep}) → Preenche endereço
    ↓
API (/api/auth/register) → Token salvo → Dashboard
```

### 3️⃣ Gerenciamento de Livros
```
Dashboard (GET /api/books) 
    ↓
BookForm → POST/PUT /api/books
    ↓
BookDetails → Editar/Deletar
```

## 🌐 Endpoints da API Utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login do usuário |
| POST | `/api/auth/register` | Registro de novo usuário |
| GET | `/api/auth/address/{cep}` | Busca endereço por CEP |
| GET | `/api/books` | Lista todos os livros |
| POST | `/api/books` | Cria novo livro |
| PUT | `/api/books/{id}` | Atualiza livro |
| DELETE | `/api/books/{id}` | Deleta livro |

## 🔐 Segurança

- ✅ Rotas protegidas com verificação de token
- ✅ Tokens armazenados no localStorage
- ✅ Logout limpa o sessionStorage
- ✅ Redirect automático para login quando sem autenticação
- ✅ CORS habilitado para comunicação com backend

## 📱 Responsividade em Detalhes

### Desktop (1024px+)
- Layout de 2 colunas (sidebar + conteúdo)
- Sidebar fixa na esquerda (260px)
- Grid de livros com 150px minmax
- Padding e font-size normais

### Tablet (768px - 1024px)
- Sidebar converte para horizontal no topo
- Grid de livros com 130px minmax
- Padding reduzido
- Font-size ajustado

### Mobile (480px - 768px)
- Layout full-width
- Sidebar compacto e scrollável
- Grid de livros com 110px minmax
- Espaçamento reduzido

### Extra Small (<480px)
- Máxima compactação
- Grid de livros com 95px minmax
- Font-size reduzido
- Botões full-width

## 🎯 Como Usar a Aplicação

### 1. Login
1. Acesse a página de login
2. Digite email e senha
3. Clique em "Entrar"
4. Se não tem conta, clique em "Criar agora"

### 2. Registro
1. Preencha nome, email e senha
2. Digite CEP (8 dígitos)
3. O endereço será preenchido automaticamente
4. Confirme a senha
5. Clique em "Criar Conta"

### 3. Dashboard
1. Veja todos os livros em grid
2. Use a barra de busca para filtrar por título
3. Clique em um livro para ver detalhes
4. Clique em "Adicionar Livro" para criar novo

### 4. Adicionar/Editar Livro
1. Preencha título, autor (obrigatório)
2. Selecione gênero (opcional)
3. Digite ano de publicação (opcional)
4. Adicione ISBN (opcional)
5. Adicione descrição (opcional)
6. Cole URL da capa (opcional)
7. Clique em "Salvar"

### 5. Detalhes do Livro
1. Visualize capa, título, autor
2. Veja informações (gênero, ano, ISBN)
3. Leia a sinopse/descrição
4. Edite ou delete o livro

## 🚦 Status do Projeto

| Feature | Status |
|---------|--------|
| Login/Registro | ✅ Completo |
| Dashboard | ✅ Completo |
| CRUD de Livros | ✅ Completo |
| Busca de Livros | ✅ Completo |
| Responsividade | ✅ Completo |
| Autenticação | ✅ Completo |
| Gerenciamento de Sessão | ✅ Completo |

## 📦 Dependências Principais

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.15.0",
  "axios": "^1.16.1",
  "lucide-react": "^1.14.0",
  "vite": "^8.0.10"
}
```

## 👨‍💻 Autor

**Gabriel Lins Rosa e Maria Eduarda Maklouf**

## 🙏 Agradecimentos

- [Vite](https://vitejs.dev/) - Build tool rápido
- [React](https://react.dev/) - JavaScript library
- [React Router](https://reactrouter.com/) - Roteamento
- [Axios](https://axios-http.com/) - HTTP client
- [Lucide React](https://lucide.dev/) - Ícones
- [ViaCEP](https://viacep.com.br/) - API de CEP

---

**Desenvolvido com ❤️ para gerenciamento de bibliotecas**

Last Updated: Maio 2026
