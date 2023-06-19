// Random dog images
fetch("https://random.dog/woof.json")
    .then((response) => response.json())
    .then((data) => {
        const weatherElement = document.getElementById("randomdog");
        weatherElement.innerHTML = `<img src="${data.url}" />`;
    })
    .catch((error) => console.error(error));
