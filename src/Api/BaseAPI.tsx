import axios from "axios";

let baseUrl = "http://localhost:3000/";

function post(endpointURL: any, data: any, config: any) {
  return axios.post(`${baseUrl}${endpointURL}`, data, config);
}

function get(endpointURL: any, config: any) {
  return axios.get(`${baseUrl}${endpointURL}`, config);
}

export default { post, get };
