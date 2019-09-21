$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our posts
  var ticketContainer = $(".ticket-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleTicketDelete);
  $(document).on("click", "button.edit", handleTicketEdit);
  // Variable to hold our posts
  var tickets;

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var tenantId;
  if (url.indexOf("?tenant_id=") !== -1) {
    tenantId = url.split("=")[1];
    getTickets(tenantId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getTickets();
  }


  // This function grabs posts from the database and updates the view
  function getTickets(tenant) {
    tenantId = tenant || "";
    if (tenantId) {
      tenantId = "/?tenant_id=" + tenantId;
    }
    $.get("/api/tickets" + tenantId, function(data) {
      console.log("Tickets", data);
      tickets = data;
      if (!tickets || !tickets.length) {
        displayEmpty(tenant);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteTicket(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/tickets/" + id
    })
      .then(function() {
        getTickets(postCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    ticketContainer.empty();
    var ticketsToAdd = [];
    for (var i = 0; i < tickets.length; i++) {
      ticketsToAdd.push(createNewRow(tickets[i]));
    }
    ticketContainer.append(ticketsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(ticket) {
    var formattedDate = new Date(ticket.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newTicketCard = $("<div>");
    newTicketCard.addClass("card");
    var newTicketCardHeading = $("<div>");
    newTicketCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newTicketTitle = $("<h2>");
    var newTicketDate = $("<small>");
    var newTicketTenant = $("<h5>");
    newTicketTenant.text("Written by: " + ticket.Tenant.name);
    newTicketTenant.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newTicketCardBody = $("<div>");
    newTicketCardBody.addClass("card-body");
    var newTicketBody = $("<p>");
    newTicketTitle.text(ticket.title + " ");
    newTicketBody.text(ticket.body);
    newTicketDate.text(formattedDate);
    newTicketTitle.append(newTicketDate);
    newTicketCardHeading.append(deleteBtn);
    newTicketCardHeading.append(editBtn);
    newTicketCardHeading.append(newTicketTitle);
    newTicketCardHeading.append(newTicketTenant);
    newTicketCardBody.append(newTicketBody);
    newTicketCard.append(newTicketCardHeading);
    newTicketCard.append(newTicketCardBody);
    newTicketCard.data("Ticket", ticket);
    return newTicketCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handleTicketDelete() {
    var currentTicket = $(this)
      .parent()
      .parent()
      .data("ticket");
    deleteTicket(currentTicket.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handleTicketEdit() {
    var currentTicket = $(this)
      .parent()
      .parent()
      .data("ticket");
    window.location.href = "/cms?ticket_id=" + currentTicket.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Tenant # " + id;
    }
    ticketContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    ticketContainer.append(messageH2);
  }

});
