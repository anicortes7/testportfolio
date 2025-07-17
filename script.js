const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const updateResultsWidth = () => {
  const searchWidth = search.clientWidth;
  matchList.style.width = searchWidth + 'px';
};

// busca y filtra search.json
const searchThing = async (searchText) => {
  const res = await fetch('../json/data.json');
  const data = await res.json();

  // coincidencias
  let matches = data.filter((item) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return item.name.match(regex) || item.year.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
  }
  if (searchText === '') {
    matchList.innerHTML = '';
  }
  outputHtml(matches);
};
// mostrar resultados
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1">
          <a href="${match.href}" target="_self"> <!-- Add anchor element with href -->
            <h4>${match.name} (${match.year})</h4>
            <small>${match.lugar}</small>
          </a>
        </div>
        `
      )
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => {
  searchThing(search.value);
  updateResultsWidth();
});
