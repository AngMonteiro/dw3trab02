-- arquivo: database/init.sql
-- Executado automaticamente pelo container do Postgres na primeira inicialização.

-- Extensão usada apenas para gerar o hash bcrypt da senha do usuário inicial
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE usuarios (
    usuarioid SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    removido BOOLEAN NOT NULL DEFAULT false
);

-- Tabela 1 (lado "1" do relacionamento)
CREATE TABLE especialidades (
    especialidadeid SERIAL PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL UNIQUE,
    descricao VARCHAR(60) NOT NULL,
    removido BOOLEAN NOT NULL DEFAULT false
);

-- Tabela 2 (lado "N" do relacionamento): uma especialidade possui vários médicos
CREATE TABLE medicos (
    medicoid SERIAL PRIMARY KEY,
    crm VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(80) NOT NULL,
    salario NUMERIC(12, 2) NOT NULL,
    dataadmissao DATE NOT NULL,
    especialidadeid INTEGER NOT NULL REFERENCES especialidades (especialidadeid),
    removido BOOLEAN NOT NULL DEFAULT false
);

-- Usuário inicial: admin / admin
INSERT INTO usuarios (username, password) VALUES ('admin', crypt('admin', gen_salt('bf')));

-- Dados de exemplo
INSERT INTO especialidades (codigo, descricao) VALUES
    ('CARD', 'Cardiologia'),
    ('PED', 'Pediatria'),
    ('ORT', 'Ortopedia');

INSERT INTO medicos (crm, nome, salario, dataadmissao, especialidadeid) VALUES
    ('CRM-SP 123456', 'Ana Paula Souza', 18500.00, '2020-03-10', 1),
    ('CRM-SP 654321', 'Carlos Henrique Lima', 15200.50, '2022-08-01', 2);
