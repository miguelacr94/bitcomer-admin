import axios from "axios";
import Cookies from "./cookies";
import { apiEndpoint } from "./config";

axios.defaults.baseURL = apiEndpoint;
function header(method, url, data, head, files) {
  const options = {
    method,
  };

  options.url = url;

  if (data !== null) {
    if (files === 0) {
      options.data = JSON.stringify(data);
    } else {
      options.data = data;
    }
  }

  options.headers = {
    "Content-Type": files !== 0 ? "multipart/form-data" : "application/json",
  };

  if (head !== 0) {
    options.headers = {
      ssid: `${head === 1 ? Cookies.read("ssid") : head}`,
      "Content-Type": files !== 0 ? "multipart/form-data" : "application/json",
    };
  }

  return options;
}

function Call(method = "GET", url, data = null, head = 1, files = 0) {
  return new Promise((resolve, reject) => {
    try {
      axios(header(method, url, data, head, files))
        .then((success) => {
          resolve(success.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

export default Call;


