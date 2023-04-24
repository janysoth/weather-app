// api url
const API_KEY = "31b82bc56c14e3b68d3ac1ad2dd6d599";


async function fetchUsers() {
    const response = await fetch(API_KEY);
    const data = await response.json();
    console.log(data);
}

fetchUsers();