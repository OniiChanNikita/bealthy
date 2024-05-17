// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
export const Home = () => {

    const [posts, setPosts] = useState({}); 
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

                    setPosts(data);
                    console.log(data);
                    console.log(posts[0])       


                    /*for (const property in data) {
                        image_name[localStorage.getItem('username')+'.'+data[property].content] = data[property].image
                    }
                    console.log(image_name);*/

                    /*const {data: {image_path}} = await axios.post('http://localhost:8000/image/', image_name, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });*/

                    /*console.log(image_path);*/
                } catch (error) {
                    console.error('Error:', error);
                }
            })();
        };
    }, []);     
    return <div className='d-flex flex-column'>
    { posts[0] == undefined ? <p style={{width: '100%', marginTop: '10%'}} className="text-center h3">У вас нету публикаций, хотите создать новую?</p> : null}
    { posts[0] == undefined ? <a style={{margin: '10px auto 0 auto', width: '30%'}} href = 'upload_post/' class="center btn btn-outline-warning">Создать публикацию</a> : null}
    <div className="row row-cols-1 row-cols-sm-2 g-3" style={{margin: 10+'px'}}>
        
        {Object.keys(posts).map(key => (
        <a href = {'post/'+posts[key].slug_post+'/'} className="col" key={key} style={{width: '350px', height: '390px', maxWidth: 30+'%'}}>
            <div className="card">
                <img class="img-thumbnail" style={{margin: '0 auto 0 auto', width: '100%', maxWidth: '300px', maxHeight: '300px'}} src={'http://localhost:8000'+posts[key].main_image.image} className="card-img-top"/>
                <div className="card-body">
                   <h5 className="card-title">{posts[key].title}</h5>
                   <p className="card-text">{posts[key].content}</p>
                </div>
            </div>
        </a>
        ))}
    </div>      
    </div>      
}


