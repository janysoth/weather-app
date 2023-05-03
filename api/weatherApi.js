// api url
const url = "https://jsonplaceholder.typicode.com/posts/1/comments";

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

//Asynchronous IIFEs
export const getUsers = (async () => {
  async function fetchUsers() {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }
  return {
    array: await fetchUsers(),
  };
})();
