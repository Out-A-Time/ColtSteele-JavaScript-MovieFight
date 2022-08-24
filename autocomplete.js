const createAutoComplete = ({
  autoCompleteWidget,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //CSS feature use Bulma CSS

  autoCompleteWidget.innerHTML = `
        <label><b>Search</b></label>
        <input class="input"/>
        <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
        </div>
    `;
  const input = autoCompleteWidget.querySelector("input");
  const dropdown = autoCompleteWidget.querySelector(".dropdown");
  const resultsWrapper = autoCompleteWidget.querySelector(".results");

  // if we use that async function in another function you get a promise back so you need to repeat the async/await to unpack the promise until you do not need it anymore
  const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    //removes empty dropdown
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const movieOption = document.createElement("a");

      movieOption.classList.add("dropdown-item");
      movieOption.innerHTML = renderOption(item);

      //when clicked removes searched list and fill input field with full movie name
      //makes another fetch request for detailed info about selected movie
      movieOption.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(movieOption);
    }
  };

  input.addEventListener("input", debounce(onInput, 900));

  //hides dropdown menu when user click somewhere outside dropdown menu
  document.addEventListener("click", (event) => {
    if (!autoCompleteWidget.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
