# Fluxo da Autenticação

Este arquivo explica o projeto de um jeito simples, pensando em quem está começando.

## 1. O que é o endpoint de registro

O endpoint de registro é a rota usada para criar um novo usuário.

Rota:

```http
POST /api/auth/register
```

O frontend envia:

```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "123456"
}
```

O backend recebe esses dados no `req.body`, verifica se todos os campos existem, checa se o email já está cadastrado e depois cria o usuário no banco.

Importante:

- A senha não é salva do jeito que a pessoa digitou.
- Antes de salvar, o backend criptografa a senha com `bcryptjs`.

## 2. O que é o endpoint de login

O endpoint de login é a rota usada para entrar no sistema.

Rota:

```http
POST /api/auth/login
```

O frontend envia:

```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

O backend recebe o email e a senha, procura o usuário no banco e compara:

- a senha digitada agora
- com a senha criptografada que já está salva

Se estiver tudo certo, o backend gera um token JWT e devolve esse token na resposta.

Exemplo de resposta:

```json
{
  "message": "Login realizado com sucesso",
  "token": "TOKEN_AQUI",
  "user": {
    "id": "123",
    "name": "Maria",
    "email": "maria@email.com"
  }
}
```

## 3. O que é a rota protegida

A rota protegida é uma rota que só pode ser acessada por quem está autenticado.

Neste projeto, ela é:

```http
GET /api/auth/me
```

Essa rota serve para buscar os dados do usuário logado.

Ela é chamada de protegida porque exige um token válido no header da requisição.

## 4. O que o frontend envia em cada requisição

### Cadastro

Na página de cadastro, o frontend envia:

- `name`
- `email`
- `password`

### Login

Na página de login, o frontend envia:

- `email`
- `password`

### Perfil

Na página de perfil, o frontend não envia body.

Ele envia o token no header:

```http
Authorization: Bearer SEU_TOKEN
```

## 5. O que o backend recebe

No backend, o Express recebe a requisição HTTP.

Quando usamos:

```js
app.use(express.json());
```

o backend consegue ler o JSON enviado pelo frontend.

Então:

- no cadastro, os dados chegam em `req.body`
- no login, os dados chegam em `req.body`
- na rota protegida, o token chega em `req.headers.authorization`

## 6. Como a senha é protegida

A senha é protegida com `bcryptjs`.

No registro, o backend faz algo assim:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

Isso significa:

- a senha original passa por um processo de criptografia
- o banco salva a versão criptografada
- a senha original não fica guardada no banco

Depois, no login, o backend compara:

```js
const passwordMatch = await bcrypt.compare(password, user.password);
```

Ou seja:

- `password` é a senha digitada agora
- `user.password` é a senha criptografada salva no banco

## 7. Como o token é gerado

Depois que o login dá certo, o backend gera um JWT com `jsonwebtoken`.

Neste projeto, ele guarda o `userId` dentro do token:

```js
jwt.sign({ userId }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});
```

Isso quer dizer:

- o token foi assinado com uma chave secreta
- o token tem o id do usuário dentro dele
- o token vence em 7 dias

## 8. Como o token é salvo no frontend

Quando o login funciona, o frontend pega o token da resposta e salva no `localStorage`.

Exemplo:

```js
localStorage.setItem("token", token);
```

O `localStorage` é um espaço no navegador para guardar dados.

Neste projeto, ele guarda o token para que o usuário não precise fazer login a cada clique.

## 9. Como o token é enviado no header

O projeto usa um arquivo central do Axios:

`frontend/lib/api.js`

Nele, existe um interceptor que pega o token salvo no navegador antes de cada requisição.

Depois, ele coloca esse token no header:

```http
Authorization: Bearer SEU_TOKEN
```

Isso é importante porque o backend usa esse header para descobrir quem está tentando acessar a rota protegida.

## 10. Como a rota protegida valida esse token

Quando a requisição chega em `GET /api/auth/me`, ela passa antes pelo middleware de autenticação.

Esse middleware faz 4 passos:

1. Verifica se existe o header `Authorization`
2. Separa o token que veio depois da palavra `Bearer`
3. Usa `jwt.verify(...)` para validar o token
4. Busca o usuário no banco usando o `userId` que estava dentro do token

Se tudo der certo:

- o backend coloca o usuário em `req.user`
- a rota `/me` responde com os dados do usuário

Se der erro:

- o backend responde com erro `401`
- o frontend limpa o token salvo
- o frontend redireciona a pessoa para a página de login

## 11. Resumo do fluxo completo

O fluxo acontece assim:

1. A pessoa preenche o cadastro no frontend
2. O frontend envia os dados para `POST /api/auth/register`
3. O backend criptografa a senha e salva o usuário no MongoDB
4. A pessoa faz login no frontend
5. O frontend envia email e senha para `POST /api/auth/login`
6. O backend valida os dados e gera um token JWT
7. O frontend salva esse token no `localStorage`
8. Quando a pessoa abre o perfil, o frontend envia o token no header
9. O middleware do backend valida o token
10. Se o token for válido, a rota protegida responde com os dados do usuário

## 12. Ideia principal para lembrar

Pense assim:

- o frontend coleta os dados do formulário
- o backend valida e processa esses dados
- o banco guarda os dados do usuário
- o token identifica quem está autenticado
- a rota protegida só responde se esse token for válido
