module.exports = function(sequelize, DataTypes) {
  var Tenant = sequelize.define("Tenant", {
    // Giving the Tenant model a name of type STRING
    address: DataTypes.STRING,
    price: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    message: DataTypes.STRING
  });

  Tenant.associate = function(models) {

    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts

    Tenant.hasMany(models.Ticket, {
      onDelete: "cascade"
    });
  };

  return Tenant;
};
