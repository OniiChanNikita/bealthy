import React, { useState } from 'react';
import axios from 'axios';

export const UploadPost = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('Выбрать логотип публикации');

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    if (selectedFile) {
      setFileName(`Выбран файл: ${selectedFile.name}`);
    } else {
      setFileName('Выберете файл');
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);


  

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="conteiner d-flex flex-column m-5 " style={{overflow: 'hidden', gap: '30px', borderRadius: '5px', borderWidth: "2px", borderColor: "#C0C0C0", borderStyle: "solid", backgroundColor: "#F3F4E9"}}>
      <div class="file-upload" style={{ borderColor: '#6da047', borderStyle:'dashed', borderWidth: '0 0 2px 0', position: "relative", overflow: "hidden", minHeight: "20vh", width: "100%", background: "rgba(109,160,71,0.35)", color: "#6da047", textAlign: "center"}}>
             <label style={{padding: '7vh', display: "block", position: "absolute", top: "0", bottom: "0", left: "0", width: "100%", height: "100%", cursor: "pointer"}}>
                  <input style = {{display: 'none'}} type="file" accept="image/*" onChange={handleImageChange} />
                  <span style = {{fontSize: '2em'}} className="filename" id='filename'>{fileName}</span>
             </label>
      </div>
      <div className='conteiner p-5 d-flex flex-column' style={{gap: '30px'}}> 
        

        <input type="text" placeholder='Post name...' style={{outline: 'none', backgroundColor: 'transparent', borderWidth: '0 0 2px 0', width: "50%", borderColor: '#8b8b8b'}}/>
        <textarea type="text" placeholder='Post content...' style={{minHeight: '50vh', maxHeight: '50vh', outline: 'none', borderRadius: '3px', backgroundColor: 'transparent', width: "100%", borderColor: '#8b8b8b'}}/>

        <div className="d-flex flex-row justify-content-around">
          <div class="file-upload" style={{ borderColor: '#6da047', borderStyle:'dashed', position: "relative", overflow: "hidden", minHeight: "20vh", width: "30vh", background: "rgba(109,160,71,0.35)", color: "#6da047", textAlign: "center"}}>
               <label style={{padding: '7vh', display: "block", position: "absolute", top: "0", bottom: "0", left: "0", width: "100%", height: "100%", cursor: "pointer"}}>
                    <input style = {{display: 'none'}} type="file" accept="image/*" onChange={handleImageChange} />
                    <span style = {{fontSize: '2em'}} disabled className="filename" id='filename'>{fileName}</span>
                 </label>
          </div>
          <div class="file-upload" style={{ borderColor: '#6da047', borderStyle:'dashed', position: "relative", overflow: "hidden", minHeight: "20vh", width: "30vh", background: "rgba(109,160,71,0.35)", color: "#6da047", textAlign: "center"}}>
               <label style={{padding: '7vh', display: "block", position: "absolute", top: "0", bottom: "0", left: "0", width: "100%", height: "100%", cursor: "pointer"}}>
                    <input style = {{display: 'none'}} type="file" accept="image/*" onChange={handleImageChange} />
                    <span style = {{fontSize: '2em'}} disabled className="filename" id='filename'>{fileName}</span>
               </label>
          </div>
        </div>

        <button onClick={handleSubmit}>Upload Post</button>
      </div>
    </form>
  );
};

