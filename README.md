# Simple Auth

Backend simples e didatico para estudo de autenticacao com JWT.

## Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv

## Como usar

1. Instale as dependencias:

```bash
npm install
```

2. Crie o arquivo `.env` com base no `.env.example`

3. Rode o projeto:

```bash
npm run dev
```

## Rotas

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Exemplo de body

### Register

```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "password": "123456"
}
```

### Login

```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

## Header da rota protegida

```http
Authorization: Bearer SEU_TOKEN
```
