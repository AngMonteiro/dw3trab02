Trabalho2 DW3 - Alunos: Angelo Fenti e Kawam Oliveira

# DW3 - 2º Trabalho - ERP Hospitalar (Módulo Saúde)

CRUD de **Especialidades** e **Médicos** (relacionamento 1:N — uma especialidade possui vários médicos),
seguindo a arquitetura cliente-servidor com back-end e front-end em servidores/portas separados.

| Serviço   | Tecnologia                     | Porta  |
|-----------|--------------------------------|--------|
| Banco     | PostgreSQL 16                  | 5433 (host) → 5432 |
| Back-end  | Node.js + Express + JWT        | 40000  |
| Front-end | Node.js + Express + Nunjucks   | 40100  |

## Como executar

Pré-requisito: Docker Desktop instalado e aberto.

```bash
docker compose up --build
```

Acesse **http://localhost:40100** e entre com:

- Usuário: `admin`
- Senha: `admin`

Para parar: `docker compose down` (para apagar também os dados do banco: `docker compose down -v`).

## Tabelas

- `especialidades` (especialidadeid, codigo, descricao, removido)
- `medicos` (medicoid, crm, nome, **salario** decimal, **dataadmissao** data, especialidadeid → especialidades, removido)
- `usuarios` (usuarioid, username, password com hash bcrypt, removido)

O script de criação está em `database/init.sql` e é executado automaticamente pelo container do Postgres.

## APIs (todas protegidas por JWT, exceto Login/Logout)

| Especialidades                        | Médicos                        |
|---------------------------------------|--------------------------------|
| GET `/getAllEspecialidades`           | GET `/getAllMedicos`           |
| GET `/getEspecialidadeByID/:id`       | GET `/getMedicoByID/:id`       |
| POST `/insertEspecialidade`           | POST `/insertMedico`           |
| PUT `/updateEspecialidade/:id`        | PUT `/updateMedico/:id`        |
| DELETE `/deleteEspecialidade/:id` (soft delete) | DELETE `/deleteMedico/:id` (soft delete) |

Login: POST `/Login` com `{ "username": "...", "password": "..." }` → retorna o token.
Exemplos de requisições em `backend/apps/*/tests/*.rest` (extensão REST Client do VS Code).

## Front-end

- Cada API possui uma função correspondente em `frontend/apps/especialidades/vwEspecialidades.js`
  e `frontend/apps/medicos/vwMedicos.js`.
- Após o login, o JWT fica salvo no `localStorage` e um cookie `IsLogged` indica que o usuário está logado.
- O front-end nunca acessa o banco diretamente: tudo passa pelas APIs do back-end.
