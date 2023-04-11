import axios from "axios";

let baseUrl = "http://localhost:3000/";

async function post(endpointURL: any, data: any, config: any) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`${baseUrl}${endpointURL}`, data, config);
    if (response) {
      resolve(response);
    }
  });
}

async function get(endpointURL: any, config: any) {
  return new Promise(async (resolve) => {
    const response = await axios.get(`${baseUrl}${endpointURL}`, config);
    if (response) {
      resolve(response);
    }
  });
}

export default { post, get };
