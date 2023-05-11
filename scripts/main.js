import { getUsers } from "../api/weatherApi.js";

(async () => {
  const data = await getUsers();
  console.log(data);
  debugger;
  data.forEach((user) => {
    const comment = `<li>${user.body}</li>`;

    document.querySelector("ul").insertAdjacentHTML("beforeend", comment);
  });

})();

