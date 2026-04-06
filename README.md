# Simple Auth

Projeto separado em duas pastas:

- `backend` para a API em Node.js/Express
- `frontend` para a interface em Next.js

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

### Backend

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale as dependencias:

```bash
npm install
```

3. Crie o arquivo `.env` com base no `.env.example`

4. Rode o projeto:

```bash
npm run dev
```

### Frontend

1. Entre na pasta do frontend:

```bash
cd frontend
```

2. Instale as dependencias:

```bash
npm install
```

3. Crie o arquivo `.env.local` com base no `.env.example`

4. Rode o frontend:

```bash
npm run dev
```

## Rotas

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Paginas do frontend

- `/`
- `/register`
- `/login`
- `/profile`

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
