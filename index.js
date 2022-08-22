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

const input = document.querySelector("input");

// if we use that async function in another function you get a promise back so you need to repeat the async/await to unpack the promise until you do not need it anymore
const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  console.log(movies);
  for (let movie of movies) {
    const div = document.createElement("div");

    div.innerHTML = `
    <img src= ${movie.Poster} />
    <h1>${movie.Title}</h1>
    `;
    console.log(movie.Title, movie.Poster);
    document.querySelector("#target").appendChild(div);
  }
};

input.addEventListener("input", debounce(onInput, 900));
