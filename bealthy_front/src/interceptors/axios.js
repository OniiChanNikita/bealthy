import axios from "axios";

 console.log(localStorage.getItem('refresh_token'))

let refresh = false;
axios.interceptors.response.use(resp => resp, async error => {
console.log(error)
if (error.response == undefined){
     error.response = ''
}
  if (error.response.status === 401 && !refresh) {
     refresh = true;
     console.log(localStorage.getItem('refresh_token'))
      const response = await axios.post(
          'http://localhost:8000/api/token/refresh/', 
          {      
               "refresh":localStorage.getItem('refresh_token')
          }, 
          { 
               headers: {
                    'Content-Type': 'application/json',
               }
          }); 
          console.log(response)

          if (response.status === 200) {
              localStorage.setItem('access_token', response.data.access);       
              localStorage.setItem('refresh_token', response.data.refresh);       
              return axios(error.config);
          }
          localStorage.clear();  
          
     }
refresh = false;
return error;
});

/*
import axios from "axios";

let refresh = false;

axios.interceptors.response.use(
  resp => resp,
  async error => {
     console.log(error.response.status)
    if (error.response && error.response.status === 401 && !refresh) {
      refresh = true;
      console.log(localStorage.getItem('refresh_token'));
      try {
        const response = await axios.post(
          'http://localhost:8000/api/token/refresh/',
          {
            refresh: localStorage.getItem('refresh_token')
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
          }
        );

        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          refresh = false;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.log("Error during token refresh:", refreshError);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);
*/