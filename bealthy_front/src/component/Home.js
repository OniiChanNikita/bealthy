// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
export const Home = () => {

    const [posts, setPosts] = useState({}); 
    const [imagePath, setImagePath] = useState('#')    
    useEffect(() => {    
        if(localStorage.getItem('access_token') === null){                               
            window.location.href = '/login'
        }
        else{         
            (async () => {
                try {
                    const {data} = await axios.get('http://localhost:8000/post/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });

                    // Установка полученных данных в состояние
                    setPosts(data);
                    console.log(data);

                    // Получение значения image из первых данных
                    const image_name = {
                        pk_image: data['1'].image
                    };
                    console.log(image_name);

                    // Выполнение второго запроса для получения image_path
                    const {data: image_path} = await axios.post('http://localhost:8000/image/', image_name, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });

                    // Установка полученного image_path в состояние
                    setImagePath('http://localhost:8000'+image_path.image_path);
                    console.log(image_path);
                } catch (error) {
                    console.error('Error:', error);
                }
            })();
        };       
    }, []);     
    return <div className="row row-cols-1 row-cols-sm-2 g-3" style={{margin: 10+'px'}}>
        {Object.keys(posts).map(key => (
        <div className="col" key={key} style={{maxWidth: 30+'%'}}>
            <div className="card">
                <img src='http://localhost:8000/images/bez.jpg' className="card-img-top"/>
                <div className="card-body">
                   <h5 className="card-title">{posts[key].title}</h5>
                   <p className="card-text">{posts[key].content}</p>
                </div>
            </div>
        </div>
        ))}
    </div>      
}


