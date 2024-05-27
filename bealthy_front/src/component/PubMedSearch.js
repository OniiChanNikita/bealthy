import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const PubMedSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = '13201decb131b6af1def032c939f6fe05509';
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${query}&retmode=json&api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const ids = response.data.esearchresult.idlist;
      if (ids.length > 0) {
        const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json&api_key=${apiKey}`;
        const summaryResponse = await axios.get(summaryUrl);
        setResults(Object.values(summaryResponse.data.result).filter(item => item.uid));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching data from PubMed:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="text-center mb-4">
        <h1 className="mb-4">PubMed Search</h1>
        <form onSubmit={handleSearch}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter search term"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>
      <div className="mt-4 w-75">
        {results.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {results.map(result => (
              <div key={result.uid} className="card p-3 shadow-sm">
                <h5 className="card-title">{result.title}</h5>
                <p className="card-text">{result.source}</p>
                <p className="card-text"><small className="text-muted">Date: {result.pubdate}</small></p>
                <p className="card-text"><small className="text-muted">Author(s): {result.sortfirstauthor}</small></p>
                <Link to={`/study/${result.uid}`} className="btn btn-secondary mt-2">Read More</Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};