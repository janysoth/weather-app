import { fetchUsers } from "../api/weatherApi.js";

// fetchUsers();
    

// Loop to display all of the comments:
data.forEach(user => {
    const comment = `<li>${user.body} </li>`;
    document.querySelector('#comments').insertAdjacentHTML('beforeend', comment);
})  

const fetchComments = async () => {
    const data = await fetchUsers();

    return data;
}    

fetchComments();



