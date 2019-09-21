$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and author select
    var phoneInput = $("#phone");
    var bodyInput = $("#body");
    var cmsForm = $("#cms");
    // var authorSelect = $("#author");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var ticketId;
    var tenantId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("?ticket_id=") !== -1) {
        ticketId = url.split("=")[1];
        getTicketData(ticketId, "ticket");
    }
    // Otherwise if we have an author_id in our url, preset the author select box to be our Author
    else if (url.indexOf("?tenant_id=") !== -1) {
        tenantId = url.split("=")[1];
    }
  
    // Getting the authors, and their posts
    // getTenants();
  
    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body, title, or author
      if (!phoneInput.val().trim() || !bodyInput.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newTicket = {
        phone: phoneInput
          .val()
          .trim(),
        body: bodyInput
          .val()
          .trim(),
        //tenantId: tenantSelect.val()
      };
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newTicket.id = TicketId;
        updateTicket(newTicket);
      }
      else {
        submitTicket(newTicket);
      }
    }
  
    // Submits a new post and brings user to blog page upon completion
    function submitTicket(ticket) {
      
      $.post("/api/tickets", ticket, function() {
        // window.location.href = "/ticket";
      
     
      });
    }
    $('.submit').click(function() {
      $('#exampleModal').modal("hide");
  });
    // // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
    // function getTicketData(id, type) {
    //   var queryUrl;
    //   switch (type) {
    //   case "Ticket":
    //     queryUrl = "/api/ticket/" + id;
    //     break;
    //   case "tenant":
    //     queryUrl = "/api/tenants/" + id;
    //     break;
    //   default:
    //     return;
    //   }
    //   $.get(queryUrl, function(data) {
    //     if (data) {
    //       console.log(data.TenantId || data.id);
    //       // If this post exists, prefill our cms forms with its data
    //       phoneInput.val(data.phone);
    //       bodyInput.val(data.body);
    //     //   authorId = data.AuthorId || data.id;
    //       // If we have a post with this id, set a flag for us to know to update the post
    //       // when we hit submit
    //       updating = true;
    //     }
    //   });
    // }
  
    // // A function to get Authors and then render our list of Authors
    // function getTenants() {
    //   $.get("/api/tenants", renderTenantList);
    // }
    // // Function to either render a list of authors, or if there are none, direct the user to the page
    // // to create an author first
    // function renderTenantList(data) {
    //   if (!data.length) {
    //     window.location.href = "/tenants";
    //   }
    //   $(".hidden").removeClass("hidden");
    //   var rowsToAdd = [];
    //   for (var i = 0; i < data.length; i++) {
    //     rowsToAdd.push(createTenantRow(data[i]));
    //   }
    //   TenantSelect.empty();
    //   console.log(rowsToAdd);
    //   console.log(tenantSelect);
    //   tenantSelect.append(rowsToAdd);
    //   tenantSelect.val(tenantId);
    // }
  
    // // Creates the author options in the dropdown
    // function createTenantRow(tenant) {
    //   var listOption = $("<option>");
    //   listOption.attr("value", tenant.id);
    //   listOption.text(tenant.name);
    //   return listOption;
    // }
  
    // // Update a given post, bring user to the blog page when done
    // function updateTicket(post) {
    //   $.ajax({
    //     method: "PUT",
    //     url: "/api/tickets",
    //     data: post
    //   })
    //     .then(function() {
    //       window.location.href = "/tickets";
    //     });
    // }
  });
  