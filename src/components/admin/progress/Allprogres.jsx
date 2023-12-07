import React, { useEffect, useState } from 'react';
import { allprogress } from '../../../services/operations/taskAPI';

const Allprogres = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await allprogress();
        if (res) {
          setTask(res);
        }
      } catch (error) {
        console.log("Could not fetch data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl font-bold mb-4'>Progress Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        task.map((item) => (
          <div key={item._id} className='border border-solid border-gray-300 p-4 mb-4'>
            <p className='font-bold'>Task ID: {item.taskId}</p>
            <p>Progress Details: {item.progressDetails}</p>
            <p>Tags: {item.tag && item.tag.join(', ')}</p>
            {/* <p>Attached File: {item.attchedFile}</p> */}
            {item.attchedFile && (
              <a href={item.attchedFile} target="_blank" rel="noopener noreferrer">
                View Attached File
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Allprogres;
