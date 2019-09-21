module.exports = function(sequelize, DataTypes) {
  var Ticket = sequelize.define("Ticket", {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Ticket.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Ticket.belongsTo(models.Tenant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Ticket;
};
