export default (sequelize, { DataTypes }) => {
  const Experiencia = sequelize.define("Experiencia", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    pessoaId: { type: DataTypes.UUID, allowNull: false },
    empresa: { type: DataTypes.STRING(180), allowNull: false, validate: { notEmpty: true } },
    cargo: { type: DataTypes.STRING(180), allowNull: false, validate: { notEmpty: true } },
    descricao: { type: DataTypes.TEXT },
    inicio: { type: DataTypes.DATEONLY },
    fim: { type: DataTypes.DATEONLY },
    atual: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, { tableName: "experiencias" });
  Experiencia.associate = (m) => Experiencia.belongsTo(m.Pessoa, { as: "pessoa", foreignKey: "pessoaId" });
  return Experiencia;
};
