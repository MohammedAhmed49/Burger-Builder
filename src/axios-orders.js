import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://burger-builder-5ecb8.firebaseio.com/'
});

export default instance;