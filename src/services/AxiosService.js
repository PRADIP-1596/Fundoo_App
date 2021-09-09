import axios from "axios";

class AxiosService {
  postMethod = (url, data, isHeaderRequired) => {
    return axios.post(url, data, isHeaderRequired);
  };
  getMethod = (url, data, isHeaderRequired) => {
    return axios.get(url, data, isHeaderRequired);
  };
  deleteMethod = (url, isHeaderRequired) => {
    return axios.delete(url, isHeaderRequired);
  };
  
}

export default AxiosService;
