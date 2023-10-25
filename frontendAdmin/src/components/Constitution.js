import React, { useState, useEffect } from 'react';

const Constitution = ({ electionid }) => {
  const [constitutionData, setConstitutionData] = useState(null);

  useEffect(() => {
    const fetchConstitutionData = async () => {
      try {
        const response = await fetch(`/constitution?electionid=${electionid}`);
        const data = await response.json();
        setConstitutionData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConstitutionData();
  }, [electionid]);

  return (
    <div>
      {constitutionData ? (
        <div>
          <h2>Constitution Data for Election {electionid}</h2>
          <p>{constitutionData}</p>
        </div>
      ) : (
        <p>Loading constitution data...</p>
      )}
    </div>
  );
};

export default Constitution;


