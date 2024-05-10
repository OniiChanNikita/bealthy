// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
export const Home = () => {
    console.log(localStorage.getItem('access_token'))
    const [message, setMessage] = useState('');     
    useEffect(() => {    
        if(localStorage.getItem('access_token') === null){                               
            window.location.href = '/login'
        }
        else{         
            (async () => {           
                    console.log('s')         
                    const {data} = await axios.get(   
                        'http://localhost:8000/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }}
                    );    
                    setMessage(data.message);  

            })()};     
    }, []);     
    return  <div className="form-signin mt-5 text-center">
                <h3>Hi {message}</h3>
            </div>
}