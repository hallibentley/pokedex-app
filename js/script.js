let pokemonRepository = (function(){
// this is an empty array because we are pushing the pokemon from the URL instead //
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
// let modalContainer = document.querySelector('#modal-container');

// this allows you to add a pokemon to the list //
function add (pokemon) {
    pokemonList.push(pokemon);
  }

// this returns all of the pokemon in the arroy pokemonList //
function getAll () {
    return pokemonList;
  }

function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
      listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-lg', 'btn-block');
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

// this function fetches the data from the apiUrl variable at the top //
  function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }) .then(function (json) {
// 'results' comes directly from the json data //
        json.results.forEach(function (item) {
// lets make each item a pokemon with a name and a details url //
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
    }

// this  function fetchest the specific details of the pokemon from the URL data //
  function loadDetails(item) {
     let url = item.detailsUrl;
     return fetch(url).then(function (response) {
       return response.json();
     }).then(function (details) {
// Sprite.front_default comes directly from the URL data //
       item.imageUrl = details.sprites.front_default;
       item.height = details.height;
       item.types = details.types;
     }) .catch(function (e) {
       console.error(e);
     });
   }

   function showDetails(pokemon) {
     pokemonRepository.loadDetails(pokemon).then(function () {
     showModal(pokemon);
     });
   }

   function showModal(pokemon) {
     let modalTitle = $(".modal-title");
     let modalBody = $(".modal-body");
     let modalFooter = $(".modal-footer");

     modalTitle.empty();
     modalBody.empty();

     let titleElement = $("<h1>" + pokemon.name + "</h1>");
     let heightElement = $("<p>" + "Height :" + pokemon.height + "</p>");
     let typeElement = $("<p>" + "Types :" + pokemon.types + "</p>");
     let imageElementFront = $('<img class="modal-image" style="width:50%">')
        imageElementFront.attr("src", pokemon.imageUrl);

      modalTitle.append(titleElement);
      modalBody.append(heightElement);
      modalBody.append(typeElement);
      modalBody.append(imageElementFront);
    }

      return {
        add: add,
        getAll: getAll,
        addListItem : addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails : showDetails,
        showModal : showModal,
      };

    // closing the IIFE //
  })();

    pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    });

     // function showModal(pokemon) {
     //   modalContainer.innerHTML = '';
     // // create div with a class called modal //
     //   let modal = document.createElement('div');
     //   modal.classList.add('modal');
    // // create close button within the modal //
    //    let closeButtonElement = document.createElement('button');
    //    closeButtonElement.classList.add('modal-close');
    //    closeButtonElement.classList.add('btn-primary');
    //    closeButtonElement.innerText = 'Close';
    //  // listen for the click of the close button, then execute hideModal function //
    //    closeButtonElement.addEventListener('click', hideModal);
    // // create the title element of h1 with the pokemon name //
    //    let titleElement = document.createElement('h1');
    //    titleElement.innerText = pokemon.name;
    //  // create paragraph element(s) with the pokemon height and types //
    //    let heightElement = document.createElement('p');
    //    heightElement.innerText = ('Height:' + " " + pokemon.height);
    //    let typeElement = document.createElement('p');
    //    typeElement.innerText = ('Types:');

    //
    //  pokemon.types.forEach((type, numberOfTypes) => {
 		// 	numberOfTypes = pokemon.types;
    //
 		// 	if (numberOfTypes === 1) {
 		// 		typeElement.innerText += type.name;
 		// 	} else {
 		// 		typeElement.innerText += type.name + ' ';
 		// 	}
 		// });
    //
    // let imageElement = document.createElement('img');
    // imageElement.classList.add('modal-image');
    // imageElement.src = pokemon.imageUrl;

     // modal.appendChild(closeButtonElement);


   // add the class is-visible to modalContainer variable //
//       modalContainer.classList.add('is-visible');
//    }
//
// // function to remove the is-visible class from the modalContainer //
//    function hideModal() {
//      modalContainer.classList.remove('is-visible');
//    }
// // listen for the escape key to be clicked and run the hideModal function //
//    window.addEventListener('keydown', (e) => {
//      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//        hideModal();
//      }
//   });
//
// //if the user clicks anywhere outside of the modal, run the hideModal function //
//   modalContainer.addEventListener('click', (e) => {
//     let target = e.target;
//     if (target === modalContainer) {
//       hideModal();
//     }
//   });
