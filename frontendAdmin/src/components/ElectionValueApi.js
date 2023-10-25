// ElectionValueApi.js

export const getElectionValue = async () => {
  try {
    const res = await fetch('/getelectiondata', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    console.log('Election data');
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    // history.push('./login');
  }
};


useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getElectionValue();
        setElectionData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
