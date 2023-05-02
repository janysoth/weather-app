import { fetchUsers } from "../api/weatherApi.js";

// Loop to display all of the comments:
data.forEach(user => {
    const comment = `<li>${user.body} </li>`;
    document.querySelector('#comments').insertAdjacentHTML('beforeend', comment);
})  

fetchUsers();



