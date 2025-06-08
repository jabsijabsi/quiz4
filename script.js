const characterTableBody = document.querySelector("#characterTable tbody");
const searchInput = document.getElementById("searchInput");
const addForm = document.getElementById("addCharacterForm");
const newCharacterName = document.getElementById("newCharacterName");

let characters = [];

async function fetchCharacters() {
  try {
    const res = await fetch("https://swapi.tech/api/people");
    const data = await res.json();
    characters = data.results.map(c => ({ name: c.name, custom: false }));
    renderCharacters(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

function renderCharacters(data) {
  characterTableBody.innerHTML = "";
  data.forEach(char => {
    const row = document.createElement("tr");
    if (char.custom) {
      row.classList.add("custom-character");
    }
    row.innerHTML = `<td>${char.name}</td>`;
    characterTableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = characters.filter(c =>
    c.name.toLowerCase().includes(query)
  );
  renderCharacters(filtered);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newCharacterName.value.trim();
  if (name) {
    characters.push({ name, custom: true });
    newCharacterName.value = "";
    renderCharacters(characters);
  }
});

fetchCharacters();