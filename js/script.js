let pokemonRepository = (function (){

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

  function getAll () {
    return pokemonList;
  }

  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  }

})();

pokemonRepository.getAll().forEach (function (pokemon) {
  document.write('<br>' + pokemon.name + pokemon.height + pokemon.type + '</br>');
})
