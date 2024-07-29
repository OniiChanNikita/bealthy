import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';



export const UploadResearch = () => {
  const history = useNavigate()
  const { id } = useParams();
  const [study, setStudy] = useState(useParams().slug);

  useEffect(() => {

    const fetchResearch = async () => {
      try {
        const response = await axios.post('http://localhost:8000/research/', {id_research: id, name: study}, { /*Muss man split machen*/
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        alert('Success saved reserach ')
        history('/');
      } catch (error) {
        console.error(error);
      }
    };
    fetchResearch()

  }, [id])

  if (!study) {
    return <LoadingSpinner />;
  }

  return null;
};

