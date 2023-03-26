import React, { useState } from 'react';
import axios from 'axios';

function Test1({result ,setResult}) {
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    let formData = new FormData(e.target);

    formData.append('image', file);
    console.log(formData.get('image'));

    try {
      // http://localhost:3080/image
      // https://img-desc-app.herokuapp.com/
      // https://imagedesc-app-back-second.onrender.com/image
      const response = await axios.post("http://localhost:3080/image", formData);

      const data = response.data;
      setResult(data.class);
    } catch (err) {
      console.log(err.message);
    }

    console.log(result)
  };

  return (
    <div>
      <form className="test" onSubmit={handleSubmit}>
        <label className="file-label">
          Choose a file:
          <input className="file-input" type="file" onChange={handleFileChange} />
        </label>
        <button className="submit-button" type="submit">Submit</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default Test1;