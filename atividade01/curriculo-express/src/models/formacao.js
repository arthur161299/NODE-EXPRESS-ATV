export default (sequelize, { DataTypes }) => {
  const Formacao = sequelize.define("Formacao", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    pessoaId: { type: DataTypes.UUID, allowNull: false },
    instituicao: { type: DataTypes.STRING(180), allowNull: false, validate: { notEmpty: true } },
    curso: { type: DataTypes.STRING(180), allowNull: false, validate: { notEmpty: true } },
    nivel: { type: DataTypes.STRING(80) },
    inicio: { type: DataTypes.DATEONLY },
    fim: { type: DataTypes.DATEONLY },
    concluido: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, { tableName: "formacoes" });
  Formacao.associate = (m) => Formacao.belongsTo(m.Pessoa, { as: "pessoa", foreignKey: "pessoaId" });
  return Formacao;
};
