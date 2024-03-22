import React, { useState } from 'react';
import axios from 'axios'
function CodeOutputChecker() {
  const [code, setCode] = useState('');
  const [inputData, setInputData] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
 const [language,setLanguage] = useState("cpp");
  const handleSubmit = async () => {
    const payload = {
      language,
      code
    }
    try{
      const {data} = await axios.post("http://localhost:5000/run",payload);
      setOutput(data.output);
    }
    catch(err){
    console.log(err.response);   
    }
    console.log(output);
  };

  return (
    <div>
      <div>
        <select
          onChange={    
            (e)=>{
              setLanguage(e.target.value);
              console.log(language);
            }
          }
          >
          <option value="cpp" >C++</option>
          <option  value="py" >Python</option>
        </select>
      </div>    
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here"
        rows={10}
        cols={80}
      />
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Input data"
        rows={5}
        cols={80}
      />
      <textarea
        value={expectedOutput}
        onChange={(e) => setExpectedOutput(e.target.value)}
        placeholder="Expected output"
        rows={5}
        cols={80}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default CodeOutputChecker;
