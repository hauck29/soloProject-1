"use strict";
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      ownerId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {}
  );
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: "ownerId" });
    Question.hasMany(models.Answer, {
      foreignKey: "questionId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return Question;
};
