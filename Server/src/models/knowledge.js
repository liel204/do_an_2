'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Knowledge extends Model {
    static associate(models) {
      Knowledge.hasMany(models.KnowledgeChunk, { foreignKey: 'knowledge_id', as: 'chunks' });
    }
  }
  Knowledge.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT('long'),
    category: DataTypes.STRING,
    file_type: DataTypes.STRING,
    file_name: DataTypes.STRING,
    status: DataTypes.ENUM('processing', 'completed', 'error'),
    chunk_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Knowledge',
    tableName: 'knowledges'
  });
  return Knowledge;
};
