//HOC
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const withLoadingProfile = (WrappedComponent, fetchData) => {
  return (props) => {
    const { slug } = props; // Получаем slug из props
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadData = async () => {
        try {
          const result = await fetchData(slug); 
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [slug]);

    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return <WrappedComponent {...props} data={data} />;
  };
};

export default withLoadingProfile;
