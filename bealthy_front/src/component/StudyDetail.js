import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';


export const StudyDetail = () => {
  const { id } = useParams();
  const [study, setStudy] = useState(null);

  useEffect(() => {
    const fetchStudy = async () => {
      const apiKey = '13201decb131b6af1def032c939f6fe05509';
      const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${id}&retmode=json&api_key=${apiKey}`;

      try {
        const response = await axios.get(url);
        const result = response.data.result[id];
        setStudy(result);
      } catch (error) {
        console.error('Error fetching data from PubMed:', error);
      }
    };

    fetchStudy();
  }, [id]);

  if (!study) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mt-5">
      <div className="card p-3 shadow-sm">
        <h1 className="card-title">{study.title}</h1>
        <p className="card-text">{study.source}</p>
        <p className="card-text"><small className="text-muted">Date: {study.pubdate}</small></p>
        <p className="card-text"><small className="text-muted">Author(s): {study.sortfirstauthor}</small></p>
        {study.elocationid && (
          <p className="card-text">
            <a href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View on PubMed</a>
          </p>
        )}
        {study.meshheadinglist && (
          <div className="card-text">
            <strong>Keywords:</strong>
            <ul>
              {study.meshheadinglist.map((heading, index) => (
                <li key={index}>{heading}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Link to="/" className="btn btn-secondary mt-3">Back to Search</Link>
    </div>
  );
};

