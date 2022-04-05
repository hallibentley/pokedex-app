let pokemonList = [
  {name:  "Eevee",
  height: 0.3,
  type: ["Normal"] },

  {name:  "Charmander",
  height: 0.6,
  type: ["Fire"] },

  {name:  "Squirtle",
  height: 0.5,
  type: ["Water"] }
];

/*for (let i = 0; i < pokemonList.length; i++) {
  document.write('<br>' + pokemonList[i].name + " " +
  ('Height:') + pokemonList[i].height + " " +
  ('Type:') + pokemonList[i].type + '</br>');
*/

pokemonList.forEach (function(pokemon) {
  document.write('<br>' + pokemon.name + pokemon.height + pokemon.type + '</br>');
});


/* if (pokemonList[i].height > 0.5) {
  document.write('Wow, thats big!');
};
*/
