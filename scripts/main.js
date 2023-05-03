import { getUsers } from "../api/weatherApi.js";

const getComments = async () => {
  const data = await getUsers;
  console.log(data);
  for (i = 0; i < data.length; i++) {
    const comment = `<li>${user.body}</li>`;
    document.querySelector("ul").insertAdjacentHTML("beforeend", comment);
  }
};

getComments();

//document.querySelector("ul").insertAdjacentHTML("beforeend", comment);
