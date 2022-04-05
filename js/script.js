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

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('new-button');
    button.addEventListener('click', function (event) {
      showDetails(pokemon.name);
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

function showDetails(pokemon) {
  console.log(pokemon);
}

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }

})();

pokemonRepository.getAll().forEach (function (pokemon) {
 pokemonRepository.addListItem(pokemon);
})
