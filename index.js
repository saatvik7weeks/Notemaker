const path = require('path')
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    // Create an array to hold file names and contents
    let tasks = [];

    files.forEach((file) => {
      const filePath = `./files/${file}`;
      const content = fs.readFileSync(filePath, 'utf8');
      tasks.push({ title: file, content: content });
    });

    res.render('index.ejs', { tasks: tasks });
  });
});

app.post('/create', (req, res) => {
  fs.writeFile(`./files/${req.body.title}.txt`, req.body.details, (err) => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
