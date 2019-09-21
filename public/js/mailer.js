
$("#sendmail").click(function(){

  mail = $('form').serialize()
  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var message = document.getElementById("message");
  if (fname.checkValidity() && lname.checkValidity() && email.checkValidity() && phone.checkValidity() && message.checkValidity()) {
  
    console.log(mail, "ha")
  $.post("/api/send",
    JSON.stringify(mail), 
function(data) {
    console.log(data, "qu");
    
  });
  } 
  
});