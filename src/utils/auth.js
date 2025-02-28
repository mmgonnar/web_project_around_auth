export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const register = (email, password, confirmPassword) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const getUserInfo = async () => {
  try {
  } catch {}
};

////////////////

// export const singup = async (emial, password) =>{
//   try {
//     const respose = await fetch("https://se-register-api.en.tripleten-services.com/v1", {
//       method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       },
//       body: JSON.stringify(value: {
//         email, password
//       })
//     })
//     const responseJson = await res.json()
//     return responseJson
//   } catch (err){
//     console.error
//   }
// }
