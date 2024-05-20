// UserPostsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import UserHeader from './UserHeader';
import PostBlock from './PostBlock';

const UserPostsPage = () => {
  /*const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);*/
  const [message, setMessage] = useState(null)  

  useEffect(() => {
    /*localStorage.setItem('access_token', data.access);*/
    const token = localStorage.setItem('access_token');
    alert(token)
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MTI4MTIzLCJpYXQiOjE3MTUxMjQxNDMsImp0aSI6Ijk1MWEwNmVlYWRkNzRmNTlhZjYyZjcyODQ3NWUwMzQ1IiwidXNlcl9pZCI6MX0.hZcXC3yZI6xrWJ9iNUC8XgmFG9dh-IsCrVAA3HRsUYE';

    if (token) {
      const decoded = jwtDecode(token);
      /*setUser(decoded.username);*/
      axios.post('https://128.0.0.1:8000', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            alert(response.data)
            setMessage(response.data);
        })
        .catch(error => {
          /*console.error('Error fetching posts:', error);*/
          alert('Error')
        });
    }
  }, []);

  return (
    <div className="user-posts-page">
      {message && <UserHeader username={message} />}
      {/*<div className="post-blocks">
        {posts.map(post => (
          <PostBlock key={post.id} post={post} />
        ))}
      </div>*/}
    </div>
  );
}

export default UserPostsPage;
