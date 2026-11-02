import test from "node:test";
import assert from "node:assert/strict";
import { isUUID, validarDados, validarId } from "../src/utils/validation.js";

test("UUID válido", () => {
  assert.equal(isUUID("550e8400-e29b-41d4-a716-446655440000"), true);
  assert.equal(isUUID("123"), false);
  assert.throws(() => validarId("123"), /UUID/);
});
test("campos obrigatórios de Pessoa", () => {
  assert.throws(() => validarDados("Pessoa", { nome: "Mariana" }), /email/);
  assert.deepEqual(validarDados("Pessoa", { nome: "Mariana", email: "m@example.com" }), { nome: "Mariana", email: "m@example.com" });
});
test("atualização parcial e tipos", () => {
  assert.deepEqual(validarDados("Projeto", { titulo: "Novo título" }, { atualizacao: true }), { titulo: "Novo título" });
  assert.throws(() => validarDados("Formacao", { concluido: "sim" }, { atualizacao: true }), /true ou false/);
});
test("campos desconhecidos e datas inválidas", () => {
  assert.throws(() => validarDados("Pessoa", { senha: "123" }), /não permitidos/);
  assert.throws(() => validarDados("Experiencia", { inicio: "2026-02-30" }, { atualizacao: true }), /AAAA-MM-DD/);
});
