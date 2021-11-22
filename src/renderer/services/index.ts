import axios from 'axios';

const services = {
  getData: () => {
    axios.get('http://localhost:8080/').then((res) => {
      console.log('Data: ', res);
    });
  },
};

export default services;
