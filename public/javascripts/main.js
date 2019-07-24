'use strict';

const main = () => {
  const form = document.querySelector('.recipe-form');
  const listRecipes = document.querySelector('.recipe-list');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const recipe = {
      title: event.srcElement.title.value,
      cuisine: event.srcElement.cuisine.value,
      duration: event.srcElement.duration.value,
      level: event.srcElement.level.value
    };
    const response = await axios.post('/api/recipes', recipe);
    const newRecipe = response.data;
    const p = document.createElement('p');
    p.innerText = `${newRecipe.title} - ${newRecipe.level}`;
    listRecipes.appendChild(p);
  });
};

window.addEventListener('load', main);
