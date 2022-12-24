

var axios = require('axios');

axios.all([
  axios.post('http://localhost:3000/api/urlss' ,  {
 url: "http://armnajafi.ir"
  }
, {headers: {'Authorization': 'bd5c5d31415779c0189041a69126be47c489db8cb7f8a06ac77d07fa8002ef54'}})
  ]).then(axios.spread((response1) => {
    console.log(response1.data.url);
  })).catch(error => {
    console.log(error);
  });
