const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "9aaa6b0a",
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

//CSS feature use Bulma CSS
const autoCompleteWidget = document.querySelector(".autocomplete");
autoCompleteWidget.innerHTML = `
<label><b>Search For a Movie</b></label>
<input class="input"/>
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
  </div>
</div>
`;
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

// if we use that async function in another function you get a promise back so you need to repeat the async/await to unpack the promise until you do not need it anymore
const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  //removes empty dropdown
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }

  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const movieOption = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    movieOption.classList.add("dropdown-item");
    movieOption.innerHTML = `
    <img src= ${imgSrc} />
    ${movie.Title}
    `;
    console.log(movie.Title, movie.Poster);
    resultsWrapper.appendChild(movieOption);

    //when clicked removes searched list and fill input field with full movie name
    //makes another fetch request for detailed info about selected movie
    movieOption.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      onMovieSelect(movie);
    });
  }
};

input.addEventListener("input", debounce(onInput, 900));

//hides dropdown menu when user click somewhere outside dropdown menu
document.addEventListener("click", (event) => {
  if (!autoCompleteWidget.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});

//makes another fetch request to get detailed info about selected movie
const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "9aaa6b0a",
      i: movie.imdbID,
    },
  });
  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
  <article class="media">
    <figure class="media-left>
      <p class="image>
        <img src="${movieDetail.Poster}">
      </p>
   </figure>
   <div class="media-content">
    <div class="content">
      <h1>${movieDetail.Title}</h1>
      <h4>${movieDetail.Genre}</h4>
      <p>${movieDetail.Plot}</p>
    </div>
   </div>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.BoxOffice}</p>
  <p class="subtitle">Box Office</p>
</article>
<article class="notification is-primary">
  <p class="title">${movieDetail.Metascore}</p>
  <p class="subtitle">Metascore</p>
</article>
<article class="notification is-primary">
  <p class="title">${movieDetail.imdbRating}</p>
  <p class="subtitle">IMDB rating</p>
</article>
<article class="notification is-primary">
  <p class="title">${movieDetail.imdbVotes}</p>
  <p class="subtitle">IMBD Votes</p>
</article>
  `;
};
