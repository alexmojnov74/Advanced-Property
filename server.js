require('dotenv').config();
const express = require("express");
const nodemailer = require ('nodemailer');
const path = require('path');
const querystring = require('querystring');    


const app = express();

// ------------------------------------------------

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const bcrypt = require('bcrypt')
const passport=require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

// EJS engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// // Routes
// app.get('/dashboard', checkAuthenticated, (req,res) => {
//     res.render('index.ejs', { name: req.user.name, email: req.user.email, phonenumber:req.user.phonenumber})
// })
app.get('/dashboard', (req,res) => {
    var message = req.session.message;
    // console.log("Message: ", message);
    // res.render('index.ejs')
    res.render('index.ejs', { name: message.name, email: message.email, phonenumber: message.phonenumber})
})

app.get('/login', checkNotAuthenticated, (req,res) => {
    
    res.redirect('/tenants')
})

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect:'/dashboard',
//     failureRedirect:'/login',
//     failureFlash: true
// }))

// //POST login route (optional, everyone has access)
app.post('/login', checkNotAuthenticated, (req, res, next) => {
    // const { body: { user } } = req;
  
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if(err) {
        // return next(err);
        console.log("error authenticating user: ", err)
      }
  
      if(passportUser) {
        // console.log("passUser: ", passportUser);
        if (req.body.email === "manager@gmail.com") {
            // return res.redirect(`/dashboard/email=${req.body.email}`);
            // var query = querystring.stringify(passportUser);
            // req.session.message = passportUser;
            // res.redirect('/dashboard');
            return res.redirect('/ticket');
        } else {
            req.session.message = passportUser;
            // console.log("ELSE");
            return res.redirect('/dashboard');
        }
      }

    //   console.log("passUser: ", passportUser);
  
      return res.redirect('/tenants');
    })(req, res, next);
  });

app.get('/register',checkNotAuthenticated, async (req,res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phonenumber: req.body.phonenumber,
        isLandLord: false
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req,res) => {
    req.logOut()
    res.redirect('/')
})

function checkAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req,res,next) {
    if(req.isAuthenticated()) {
        console.log("authenticated")
        return res.redirect('/dashboard')
    }
    next()
}


// ------------------------------------------------




var PORT = process.env.PORT || 3000;
var PORT2 = 3030
var db = require("./models");
//app.use(express.static(process.cwd() + "public"));
app.use(express.static("public"));




//routes
require("./routes/html-routes.js")(app);

//JS routes not ready!!
require("./routes/tenant-api-routes.js")(app);
require("./routes/tickets-api-routes.js")(app);

// placeholder name
//var routes = require("./controllers/controller.js");

//app.use(routes);

db.sequelize.sync({}).then(function () {
    app.listen(PORT2, function () {
        console.log("Server listening on: http://localhost:" + PORT);
    });
});

// function test() {
//     console.log(mailerobject)
// }
var mailerobject;

app.post("/api/send", function(req, res){
    mailerobject = req.body;
    console.log(req.body)
    //  test()
    const output2 = `
 <h2>There is a message from your web-site</h2>
 <h3>Contact Details</h3>
 <ul>
 <li>First Name: ${req.body.fname}</li>
 <li>Last Name: ${req.body.lname}</li>
 <li>Email: ${req.body.email}</li>
 <li>Telephone: ${req.body.phone}</li>
 </ul>
 <h3>Message</h3>
 <p>${req.body.message}</p>
 `;
    // const output2 = JSON.stringify(mailerobject)
 // create reusable transporter object using the default SMTP transport

 var MAIL_LOGIN = process.env.MAIL_LOGIN 
 var MAIL_PASS = process.env.MAIL_PASS

 let transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
      user: MAIL_LOGIN || 'alexmojnov@gmail.com', // generated ethereal user
      pass: MAIL_PASS || '6464693500aA!'  // generated ethereal password
  },
//   tls:{
//     rejectUnauthorized:false
//   }
});

// setup email data with unicode symbols
const mailOptions = {
    from: '"Message Delivery" <alexmojnov@gmail.com>', // sender address
    to: 'alexmojnov@gmail.com', // list of receivers
    subject: 'Contcat Form Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output2 // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
    
});




app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});

