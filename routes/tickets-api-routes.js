// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/tickets", function(req, res) {
    var query = {};
    if (req.query.tenant_id) {
      query.TenantId = req.query.tenant_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Ticket.findAll({
      where: query,
      include: [db.Tenant]
    }).then(function(dbTicket) {
      res.json(dbTicket);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/tickets/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Ticket.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Tenant]
    }).then(function(dbTicket) {
      res.json(dbTicket);
    });
  });

  // POST route for saving a new post
  app.post("/api/tickets", function(req, res) {
    db.Ticket.create(req.body).then(function(dbTicket) {
      res.json(dbTicket);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/tickets/:id", function(req, res) {
    db.Ticket.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTicket) {
      res.json(dbTicket);
    });
  });

  // PUT route for updating posts
  app.put("/api/tickets", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTicket) {
      res.json(dbTicket);
    });
  });
};
