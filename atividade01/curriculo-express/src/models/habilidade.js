export default (sequelize, { DataTypes }) => {
  const Habilidade = sequelize.define("Habilidade", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    pessoaId: { type: DataTypes.UUID, allowNull: false },
    nome: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: true } },
    nivel: { type: DataTypes.STRING(40) },
  }, { tableName: "habilidades" });
  Habilidade.associate = (m) => Habilidade.belongsTo(m.Pessoa, { as: "pessoa", foreignKey: "pessoaId" });
  return Habilidade;
};
