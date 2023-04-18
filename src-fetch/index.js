// api url
const url =
	"https://jsonplaceholder.typicode.com/posts/1/comments";

// fetch(url)
//     .then (res => {
//         return res.json();
//     })
//     .then (data => {
//         data.forEach(user => {
//             const comment = `<li>${user.body}</li>`;

//             document.querySelector('ul').insertAdjacentHTML('beforeend', comment);
//         })
//     })

async function fetchUsers() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // Loop to display all of the comments:
    data.forEach(user => {
        const comment = `<li>${user.body}</li>`;
        document.querySelector('#comments').insertAdjacentHTML('beforeend', comment);
    })
    
}

fetchUsers();