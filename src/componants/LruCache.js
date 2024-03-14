import React, { useState } from 'react';
import axios from 'axios';

const LruCache = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [getResponse, setGetResponse] = useState('');
  const [setMessage, setSetMessage] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'key') {
      setKey(event.target.value);
    } else {
      setValue(event.target.value);
    }
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/get/${key}`);
      setGetResponse(`key: ${response.data.key}, value: ${response.data.value}`);
    } catch (error) {
      setGetResponse('Key not found in cache');
    }
  };

  const handleSet = async () => {
    try {
      const response = await axios.post('http://localhost:8080/set', { key, value });
      setSetMessage(response.data.message)
    } catch (error) {
      setSetMessage('Failed to set value in cache', error);
    }
  };

  return (
    <div className='container'>
      <h1>LRU Cache</h1>
      <div>
        <label>
          Key:
          <input type="text" name="key" value={key} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Value:
          <input type="text" name="value" value={value} onChange={handleChange} />
        </label>
        <button onClick={handleSet}>Set Value</button>
        <button onClick={handleGet}>Get Value</button>
        <div>Get Response: {getResponse}</div>
        <div>Set Response:{setMessage}</div>
      </div>
    </div>
  );
};

export default LruCache;
