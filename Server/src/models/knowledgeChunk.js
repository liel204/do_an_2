'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class KnowledgeChunk extends Model {
    static associate(models) {
      KnowledgeChunk.belongsTo(models.Knowledge, { foreignKey: 'knowledge_id', as: 'knowledge' });
    }
  }
  KnowledgeChunk.init({
    knowledge_id: DataTypes.INTEGER,
    chunk_text: DataTypes.TEXT,
    chunk_index: DataTypes.INTEGER,
    vector_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KnowledgeChunk',
    tableName: 'knowledge_chunks'
  });
  return KnowledgeChunk;
};
