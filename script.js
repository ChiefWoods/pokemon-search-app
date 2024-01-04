const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-button');
const resultDiv = document.querySelector('.result');
const pokemonName = document.querySelector('#pokemon-name');
const pokemonId = document.querySelector('#pokemon-id');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const types = document.querySelector('#types');
const sprite = document.querySelector('#sprite');
const hp = document.querySelector('#hp');
const attack = document.querySelector('#attack');
const defense = document.querySelector('#defense');
const specialAttack = document.querySelector('#special-attack');
const specialDefense = document.querySelector('#special-defense');
const speed = document.querySelector('#speed');

function fetchPokemon(identifier) {
  const formatted = identifier.toLowerCase().replace(/[^a-z0-9- ]/g, '').replace(/\s+/g, '-');

  fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/' + formatted)
    .then(response => response.json())
    .then(data => createResultDiv(data))
    .catch(error => alert('Pokémon not found'));
}

function createResultDiv(data) {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = '#' + data.id;
  weight.textContent = 'Weight: ' + data.weight;
  height.textContent = 'Height: ' + data.height;
  types.innerHTML = data.types.reduce((html, type) => html + `<span class="type ${type.type.name}">${type.type.name.toUpperCase()}</span>`, '');
  sprite.src = data.sprites.front_default;
  hp.textContent = data.stats.filter(stat => stat.stat.name === 'hp')[0].base_stat;
  attack.textContent = data.stats.filter(stat => stat.stat.name === 'attack')[0].base_stat;
  defense.textContent = data.stats.filter(stat => stat.stat.name === 'defense')[0].base_stat;
  specialAttack.textContent = data.stats.filter(stat => stat.stat.name === 'special-attack')[0].base_stat;
  specialDefense.textContent = data.stats.filter(stat => stat.stat.name === 'special-defense')[0].base_stat;
  speed.textContent = data.stats.filter(stat => stat.stat.name === 'speed')[0].base_stat;
}

searchBtn.addEventListener('click', () => {
  const identifier = searchInput.value;
  fetchPokemon(identifier);
});