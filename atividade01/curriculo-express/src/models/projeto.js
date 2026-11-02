export default (sequelize, { DataTypes }) => {
  const Projeto = sequelize.define("Projeto", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    pessoaId: { type: DataTypes.UUID, allowNull: false },
    titulo: { type: DataTypes.STRING(180), allowNull: false, validate: { notEmpty: true } },
    descricao: { type: DataTypes.TEXT },
    tecnologias: { type: DataTypes.STRING(255) },
    link: { type: DataTypes.STRING(255) },
  }, { tableName: "projetos" });
  Projeto.associate = (m) => Projeto.belongsTo(m.Pessoa, { as: "pessoa", foreignKey: "pessoaId" });
  return Projeto;
};
