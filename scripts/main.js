import { getUsers } from "../api/weatherApi.js";

(async () => {
  const data = await getUsers;
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const comment = `<li>${user.body}</li>`;
    document.querySelector("ul").insertAdjacentHTML("beforeend", comment);
  }
})();

//getComments();

  // data.forEach((user) => {
  //   const comment = `<li>${user.body}</li>`;

  //   document.querySelector("ul").insertAdjacentHTML("beforeend", comment);
  // });