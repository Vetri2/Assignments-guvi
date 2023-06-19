// Fetch random user data from the Random User API
fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((data) => {
        const userElement = document.getElementById("user");
        const user = data.results[0];
        userElement.innerHTML = `
      <img src="${user.picture.large}" alt="User Avatar">
      <p>Name: ${user.name.first} ${user.name.last}</p>
      <p>Email: ${user.email}</p>
    `;
    })
    .catch((error) => console.error(error));
