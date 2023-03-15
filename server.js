//jshint esversion:6
const express = require ("express");
const bodyParser = require ("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

const app = express();

const PORT = process.env.PORT || 3000;

app.set ('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


mongoose.set('strictQuery',false);
//Data Base Connection/server
mongoose.connect("mongodb+srv://draughtingindustries:Laralucy8@cluster0.82svow8.mongodb.net/todolistDb")


//DB Schema
const itemsSchema =new mongoose.Schema ({
  name: String
});
//mongoose model
const Item = new mongoose.model("Item",itemsSchema);
//items
const item1 = new Item({
  name: "Wake Up"
});

const item2 = new Item({
  name:"Brush Teeth"
});

const item3 = new Item({
  name:"Wash Face"
});

const defaultItems = [item1,item2,item3];





//Date from Stack overflow
app.get("/", function(req, res){

  Item.find({}, function(err, foundItems){

    if(foundItems.length === 0){

      //insert to model
    Item.insertMany(defaultItems, function(err){

      if (err) {
          console.log(err);
        } else {
          console.log("Success");
        }
      });
    }else{
      res.render ("list",{listTitle:day, newListItems:foundItems});
    }
  });

  let today = new Date();
    console.log(today);

    let options = {

      weekday:"long",
      day:"numeric",
      month:"long"
    }

    let day = today.toLocaleDateString("en-US", options);
});

app.post("/", function(req,res){

  const itemName = req.body.newItem;
  console.log(itemName);

  const item = new Item ({
    name:itemName
  });

  item.save();

  res.redirect("/");
});

//Deleting Items//
app.post("/delete", function (req, res){
  const checkedItemId = req.body.checkboxie;
//remove from database
  Item.findByIdAndDelete(checkedItemId, function(err) {
    if (!err) {
      console.log("Item Deleted");
      res.redirect("/");
    }
  });
});


app.listen(PORT,function(){
    console.log("Server running on port 3000!");
});
