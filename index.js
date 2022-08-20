const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "9aaa6b0a",
      s: searchTerm,
    },
  });

  console.log(response.data);
};

const input = document.querySelector("input");
let timeoutId;
const onInput = (event) => {
  //this clears timeoutId, and assign new one straight after with setTimeout
  //it is called "Debouncing an input"
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  //waiting a 1 sec to fetch data when user taping inside search
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 1000);
};
input.addEventListener("input", onInput);
