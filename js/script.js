let pokemonList = [
  {name:  "Eevee",
  height: 0.3,
  type: "normal"},

  {name:  "Charmander",
  height: 0.6,
  type: "fire"},

  {name:  "Squirtle",
  height: 0.5,
  type: "water"}
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ('Height:') + pokemonList[i].height);
 if (pokemonList[i].height > 0.5) {
  document.write('Wow, thats big!');
}
}
