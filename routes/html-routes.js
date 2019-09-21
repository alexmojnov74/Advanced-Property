
// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // porperties route loads properties .html
  app.get("/properties", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/properties.html"));
  });

  // tenants route loads tenants.html
  app.get("/tenants", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tenants.html"));
  });

  // contacts route loads contact.html
  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });

// contacts route loads cms.html
app.get("/cms", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/cms.html"));
});  

// contacts route loads cms.html
app.get("/ticket", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/ticket.html"));
}); 

// contacts route loads cms.html
app.get("/tenant_manager", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/tenant_manager.html"));
}); 

app.get("/tenant", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/tenant.html"));
});

};
