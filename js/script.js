let pokemonRepository = (function() {
  // this is an empty array because we are pushing the pokemon from the URL instead //
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // this allows you to add a pokemon to the list //
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // this returns all of the pokemon in the arroy pokemonList //
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-lg', 'btn-block');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // this function fetches the data from the apiUrl variable at the top //
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        // 'results' comes directly from the json data //
        json.results.forEach(function(item) {
          // lets make each item a pokemon with a name and a details url //
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // this  function fetchest the specific details of the pokemon from the URL data //
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Sprite.front_default comes directly from the URL data //
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    // let modalFooter = $('.modal-footer');

    modalTitle.empty();
    modalBody.empty();

    //iterating over the multiple types, creating "typeString" to be used in "typeElement"//
    let typeString = '';
    for (let i = 0; i < pokemon.types.length; i++) {
      if (i !== pokemon.types.length - 1) {
        typeString += pokemon.types[i].type.name + ', ';
      } else {
        typeString += pokemon.types[i].type.name;
      }
    }

    let titleElement = $('<h1>' + pokemon.name + '</h1>');
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
    let typeElement = $('<p>' + 'Types : ' + typeString + '</p>');
    let imageElementFront = $('<img class="modal-image" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrl);

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
    modalBody.append(imageElementFront);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };

  // closing the IIFE //
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
