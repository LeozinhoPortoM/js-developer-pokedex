const pokemonList = document.getElementById("pokemonList");
const pokemonOne = document.getElementById("pokemonOne");
const loadMoreButton = document.getElementById("loadMoreButton");
const id = window.location.href.slice(-1);

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <a href="../../pokemon.html#${pokemon.number}">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join("")}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </a>
    `;
}

function onePokemon(pokemon) {
  return `
  <div class="bodypokemon ${pokemon.types[0].type.name}">
    <div class="container-navegation" >
          <a href="./index.html"
            ><img src="./assets/img/seta-esquerda.png" alt=""
          /></a>
          <img src="./assets/img/love.png" alt="" />
    </div>
    <div class="menu-info">
      <div class="info-pokemon">
        <span>${pokemon.name}</span>
        <div class="type">
          ${pokemon.types
            .map((type) => `<span >${type.type.name}</span>`)
            .join("")}
        </div>
      </div>
      <span class="number">#${pokemon.id}</span>
    </div>
    <div class="img-pokemon">
      <img
        src="${pokemon.sprites.other.dream_world.front_default}"
      />
    </div>
    <article class="detail-pockmon">
      <nav>
        <a href=""><li>About</li></a>
        <a href=""><li>Base Stats</li></a>
        <a href=""><li>Evolutions</li></a>
        <a href=""><li>Moves</li></a>
      </nav>
      <ol class="detail-type">
        <li>Species</li>
        <li>Height <span>${pokemon.height.toString()}</span></li>
        <li>Weight <span>${pokemon.weight.toString()}</span></li>
        <li>Abilities <span>${pokemon.abilities.map(
          (ability) => ability.ability.name
        )}</span></li>
      </ol>
      <h4>Breeding</h4>
      <ol class="detail-type">
        <li>Gender</li>
        <li>Egg Groups</li>
        <li>Egg Cycle</li>
      </ol>
    </article>
  </div>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    if(pokemonList){
      pokemonList.innerHTML += newHtml;
    }
  });
}

function loadPokemon(number) {
  pokeApi.getPokemon(number).then((pokemon) => {
    console.log(pokemon);
    pokemonOne.innerHTML = onePokemon(pokemon);
  });
}

loadPokemon(id);

loadPokemonItens(offset, limit);

if (loadMoreButton) {
  loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItens(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
      loadPokemonItens(offset, limit);
    }
  });
}
