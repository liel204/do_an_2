'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatHistory extends Model {
    static associate(models) {
      // define association here
    }
  }
  ChatHistory.init({
    session_id: DataTypes.STRING,
    user_question: DataTypes.TEXT,
    bot_answer: DataTypes.TEXT,
    sources: DataTypes.JSON,
    response_time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChatHistory',
    tableName: 'chat_histories'
  });
  return ChatHistory;
};
