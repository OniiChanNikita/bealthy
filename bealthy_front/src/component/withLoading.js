/*HOC*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const withLoading = (WrappedComponent, fetchData) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadData = async () => {
        try {
          const result = await fetchData();
          console.log(result)
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, []);
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return <WrappedComponent {...props} data={data} />;
  };
};

export default withLoading;
