import Axios from "axios";

Axios.interceptors.request.use(async (config) => {
  config.baseURL = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json'
  return config;
});

class API {

  public async getInitialFeed() {
    return await Axios.get('',);
  }

}

export default new API();