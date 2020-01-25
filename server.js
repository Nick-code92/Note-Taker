const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

const dbJSON = []
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//HTML routes:
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function (req, res) {
    res.json(dbJSON);
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = newNote.title.split(" ").join("").toLowerCase()
    dbJSON.push(newNote);
    console.log(newNote)
    console.log(dbJSON)
    res.json(newNote)
});
app.delete("/api/notes/:id", function (req, res) {
    var delNote = req.params.id

    for (var i = 0; i < dbJSON.length; i++) {
        if (delNote === dbJSON[i].id) {
            dbJSON.splice(i, 1)
            return res.json(dbJSON)
        }
    } res.send(false)

});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

