const express = require('express');
const app = express();
const { sequelize, Recipe } = require('./models/Recipe');
const PORT = process.env.PORT || 8080;
const path = require('path');
const hbs = require('hbs'); // Add this line

app.use(express.json());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'public')); // Update this line

// Set the view engine to "hbs"
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'public', 'partials')); // Update this line

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/new-recipe', (req, res) => {
  res.render('newrecipe', { title: 'New Recipe' });
});

app.post('/new-recipe', async (req, res) => {
  console.log(req.body);
  const { name, ingredients, instructions } = req.body;
  try {
    const newRecipe = await Recipe.create({
      name,
      ingredients,
      instructions,
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error creating new recipe:', error);
    res.render('newrecipe', { title: 'New Recipe', error: 'Error creating new recipe' });
  }
});

app.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.render('home', { title: 'Recipe Website', recipes });
  } catch (error) {
    console.error('Error retrieving recipes: ', error);
    res.render('home', { title: 'Recipe Website', error: 'Error retrieving recipes' });
  }
});

app.listen(PORT, () => {
  console.log('Server is listening at ' + PORT);
});
