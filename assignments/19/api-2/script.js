// Fetch a Chuck Norris joke from the API
fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => response.json())
    .then((data) => {
        const jokeElement = document.getElementById("joke");
        jokeElement.innerHTML = `Chuck Norris Joke: ${data.value}`;
    })
    .catch((error) => console.error(error));
