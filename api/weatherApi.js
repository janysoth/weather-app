// api url
const url = "https://jsonplaceholder.typicode.com/posts/1/comments";

export const getUsers = async () => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};






