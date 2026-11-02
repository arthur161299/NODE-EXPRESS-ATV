export default (sequelize, { DataTypes }) => {
  const Pessoa = sequelize.define("Pessoa", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nome: { type: DataTypes.STRING(150), allowNull: false, validate: { notEmpty: true } },
    email: { type: DataTypes.STRING(180), allowNull: false, unique: true, validate: { isEmail: true, notEmpty: true } },
    telefone: { type: DataTypes.STRING(30) },
    cidade: { type: DataTypes.STRING(100) },
    resumo: { type: DataTypes.TEXT },
    linkedin: { type: DataTypes.STRING(255) },
    github: { type: DataTypes.STRING(255) },
  }, { tableName: "pessoas" });

  Pessoa.associate = (m) => {
    Pessoa.hasMany(m.Formacao, { as: "formacoes", foreignKey: "pessoaId", onDelete: "CASCADE" });
    Pessoa.hasMany(m.Experiencia, { as: "experiencias", foreignKey: "pessoaId", onDelete: "CASCADE" });
    Pessoa.hasMany(m.Projeto, { as: "projetos", foreignKey: "pessoaId", onDelete: "CASCADE" });
    Pessoa.hasMany(m.Habilidade, { as: "habilidades", foreignKey: "pessoaId", onDelete: "CASCADE" });
  };
  return Pessoa;
};
