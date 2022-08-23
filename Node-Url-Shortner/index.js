const express = require("express");
const app = express();
const db = require("./config/mongoose");
const shortURL = require("./models/shortURL");
app.use(express.urlencoded({ extended: true }));
// Set EJS as templating engine
app.set("view engine", "ejs");
// Set static files
app.use(express.static("public"));
// Handling Get request
app.get("/", async (req, res) => {
  const urlDoc = await shortURL.find();
  res.render("home", { urls: urlDoc });
});
//Handling Post Request
app.post("/shorturl", async (req, res) => {
  const fullUrl = req.body.fullurl;
  await shortURL.create({ full: fullUrl });
  res.redirect("/");
});
// Handling Short Urls
app.get("/:short", async (req, res) => {
  const shortUrl = req.params.short;
  const doc = await shortURL.findOne({ short: shortUrl })
  if(doc == null){
    res.sendStatus(404);
    return;
  }
  doc.click++;
  doc.save();
  res.redirect(doc.full)
});
//Handling delete 
app.post('/delete',async (req,res) =>{
    const id = req.body.id;
    await shortURL.findOneAndDelete(id)
    res.redirect('/')
})
app.listen(8000, (err) => {
  if (!err) {
    console.log("server is up and running");
  } else {
    console.log("something went wrong");
  }
});
