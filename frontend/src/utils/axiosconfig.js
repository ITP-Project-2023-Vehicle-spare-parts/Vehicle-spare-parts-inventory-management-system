export const base_url = "http://localhost:8000/";
const getTokenFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
:null;

export const config = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
      Accept: "application/json"
    },
  };