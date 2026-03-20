'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatbotConfig extends Model {
    static associate(models) {
      // define association here
    }
  }
  ChatbotConfig.init({
    config_key: DataTypes.STRING,
    config_value: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ChatbotConfig',
    tableName: 'chatbot_configs'
  });
  return ChatbotConfig;
};
