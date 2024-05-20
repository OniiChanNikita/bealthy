// Import the react JS packages 
import axios from "axios";
import {useState} from "react";// Define the Login function.

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');     // Create the submit method.
  const [email, setEmail] = useState('');     // Create the submit method.
  const submit = async e => {
    console.log('s')
    e.preventDefault(); 

    const user = {
      username: username,
      email: email,
      password: password
    };          // Create the POST requuest
    // Initialize the access & refresh token in localstorage.    
    const resp = await axios.post(
      'http://localhost:8000/signup/',
      user,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    console.log(resp.data.res)
    if (resp.data.res === 'created'){
      const {data} = await axios.post(
        'http://localhost:8000/api/token/',
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      alert(data.access)

      localStorage.clear();

      localStorage.setItem('access_token', data.access);

      localStorage.setItem('refresh_token', data.refresh);  

      localStorage.setItem('username', username) 

      //axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;

      window.location.href = '/'
    } else if(resp.data.res === 'not_created'){
      console.log('error create user')
    }

    
    
  }
  return(      
    <div className="Auth-form-container" style={{marginTop: '10%', marginRight: '33%', marginLeft: '33%'}}>
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input name='email' 
                type="email"     
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary">Create account</button>
            </div>
            <div className="d-grid gap-1 mt-3">
            <a href='/login' className="btn btn-outline-success">Have account?</a>
            </div>

          </div>
       </form>
     </div>
     )
}