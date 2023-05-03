import { getUsers } from "../api/weatherApi.js";

const getComments = async () => {
  const data = await getUsers;
  console.log(data);
  data.forEach((user) => {
    const comment = `<li>${user.body}</li>`;
    console.log(comment);

    document.querySelector("ul").insertAdjacentHTML("beforeend", comment);
  });
};

getComments();
