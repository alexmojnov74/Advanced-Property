$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var nameInput = $("#tenant-name");
  var tenantList = $("tbody");
  var tenantContainer = $(".tenant-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#tenant-form", handleTenantFormSubmit);
  $(document).on("click", ".delete-tenant", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getTenants();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleTenantFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertTenant({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertTenant(tenantData) {
    $.post("/api/tenants", tenantData)
      .then(getTenants);
  }

  // Function for creating a new list row for authors
  function createTenantRow(tenantData) {
    var newTr = $("<tr>");
    newTr.data("tenant", tenantData);
    newTr.append("<td>" + tenantData.name + "</td>");
    if (tenantData.Tickets) {
      newTr.append("<td> " + tenantData.Tickets.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/ticket?tenant_id=" + tenantData.id + "'>Go to Tickets</a></td>");
    newTr.append("<td><a href='/cms?tenant_id=" + tenantData.id + "'>Create a Ticket</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-tenant'>Delete Tenant</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getTenants() {
    $.get("/api/tenants", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createTenantRow(data[i]));
      }
      renderTenantList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderTenantList(rows) {
    tenantList.children().not(":last").remove();
    tenantContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      tenantList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Tenant before you can create a Ticket.");
    tenantContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("tenant");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/tenants/" + id
    })
      .then(getTenants);
  }
});
