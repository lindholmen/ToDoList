const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

let items = ["Buy milk","Pay bill","Call David"];
let workItems = [];

app.get("/", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    let day = today.toLocaleDateString("en-US", options)

    res.render('list', {listTitle: day, newListItems: items});
});

function deleteItem( oriArr, delArr ) {
    for (item of delArr) {
        const index = oriArr.indexOf(item);
        if (index > -1) {
            oriArr.splice(index, 1);
        }
    }
    return oriArr;
}

app.post('/', (req,res) => {
    let arr = req.body['deleted-item'].split(",");
    if (req.body.listBtn === 'Work'){
        workItems = deleteItem(workItems, arr);

        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
        items = deleteItem(items, arr);
        items.push(req.body.newItem);
        res.redirect("/");
    }

});

app.get('/work',(req, res)=>{
   res.render("list", {listTitle:"Work List", newListItems: workItems})
});

app.get('/about',(req, res)=>{
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
})

