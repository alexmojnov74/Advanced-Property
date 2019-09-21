var db = require("../models");

module.exports = function(app) {
  app.get("/api/tenants", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Tenant.findAll({
      include: [db.Ticket]
    }).then(function(dbTenants) {
      res.json(dbTenants);
    });
  });

  app.get("/api/tenants/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Tenant.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Ticket]
    }).then(function(dbTenants) {
      res.json(dbTenants);
    });
  });

  app.post("/api/tenants", function(req, res) {
    console.log(req.body)
    db.Tenant.create(req.body).then(function(dbTenants) {
      res.json(dbTenants);
    });
  });

  

  app.delete("/api/tenants/:id", function(req, res) {
    db.Tenant.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTenants) {
      res.json(dbTenants);
    });
  });

};
