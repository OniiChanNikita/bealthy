import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';

export const UploadPost = () => {
  const formData = new FormData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLogo, setImageLogo] = useState(null)
  const [images, setImages] = useState([])

  const [fileNameLogo, setFileNameLogo] = useState('Выбрать логотип публикации');
  
  const [fileName, setFileName] = useState('Выбрать изображения к публикации');
  const [fileInputs, setFileInputs] = useState([{ id: 1, file: { name: 'Выбрать изображения к публикации'}}]);

  const [showModal, setShowModal] = useState(false);
  const [appendResearch, setAppendResearch] = useState([])

  const [research, setResearch] = useState([])

  const [selectedTypePost, setSelectedTypePost] = useState(null);

  const handleItemClick = (item) => {
    setSelectedTypePost(item);
    console.log(item)
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleClose = () => setShowModal(false);
  const handleShow = async () => {
    try {
      const research = await axios.get('http://localhost:8000/research/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      setResearch(research.data)
      console.log(research.data);
    } catch (error) {
      console.error(error);
    }
    setShowModal(true);
  }
  const handleChange = (key, e) => {
    console.log(appendResearch.includes(research[key].name), research[key].name)
    if (appendResearch.includes(research[key].name) == false){
      setAppendResearch([...appendResearch, research[key].name])
    } if (appendResearch.includes(research[key].name) == true) {
      const arr = appendResearch
      arr.splice(appendResearch.indexOf(research[key].name), 1)
      setAppendResearch(arr)
    }
  };
  

  const handleImageChangeLogo = (e) => {
    const selectedFile = e.target.files[0];
    setImageLogo(selectedFile);
    if (selectedFile) {
      setFileName(`Выбран файл: ${selectedFile.name}`);
    } else {
      setFileName('Выбрать логотип публикации');
    }
  };

  const handleImageChange = (index, e) => {
    setImages([...images, e.target.files[0]])
    const selectedFile = e.target.files[0];
    const updatedFileInputs = [...fileInputs];
    updatedFileInputs[index].file = selectedFile;
    setFileInputs(updatedFileInputs);
    if (selectedFile) {
      setFileName(`Выбран файл: ${fileInputs[index].file.name}`);
    } else {
      setFileName('Выбрать изображения к публикации');
    }
  };

  const handleAddFileInput = () => {
    const newId = fileInputs.length + 1;
    setFileInputs([...fileInputs, { id: newId , file: { name: 'Выбрать изображения к публикации'}}]);
  };
/////////////////////////////////////////////////////
  const handleSubmit = () => {
    // Добавление данных в formData
    formData.append('imageLogo', imageLogo);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('researches', appendResearch);
    formData.append('selectedTypePost', selectedTypePost);
    for (let i = 0; i < images.length; i++) {
      formData.append(`image${i}`, images[i]);
    }
    console.log(formData)

    // Отправка запроса с помощью axios после завершения добавления данных
    const handleSubmitPost = async () => {
      try {
        console.log('await');
        const response = await axios.post('http://localhost:8000/post/', formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
          }
        });
        console.log(response.data);
      } catch (e) {
        console.log('logout not working', e);
      }
    };

    // Вызов функции отправки запроса
    handleSubmitPost();
  };


  return (
    <div>
    <form  encType='multipart/form-data' onSubmit={() => {return false}} className="conteiner d-flex flex-column m-5 " style={{overflow: 'hidden', gap: '30px', borderRadius: '5px', borderWidth: "2px", borderColor: "#C0C0C0", borderStyle: "solid", backgroundColor: "#F3F4E9"}}>

      
               
      <div className="file-upload" style={{ borderColor: '#6da047', borderStyle:'dashed', borderWidth: '0 0 2px 0', position: "relative", overflow: "hidden", minHeight: "20vh", width: "100%", background: "rgba(109,160,71,0.35)", color: "#6da047", textAlign: "center"}}>
             <label style={{padding: '7vh 0 7vh 0', display: "block", position: "absolute", top: "0", bottom: "0", left: "0", width: "100%", height: "100%", cursor: "pointer"}}>
                  <input required style = {{display: 'none'}} type="file" accept="image/*" onChange={handleImageChangeLogo} />
                  <span style = {{fontSize: '4vh'}} className="filename" id='filename'>{fileNameLogo}</span>
             </label>
      </div>
      <div className='conteiner p-5 d-flex flex-column' style={{gap: '30px'}}> 
        

        <input required value={title} onChange={handleTitleChange} style={{outline: 'none', backgroundColor: 'transparent', borderWidth: '0 0 2px 0', width: "50%", borderColor: '#8b8b8b'}}/>
        <textarea required value={description} onChange={handleDescriptionChange} type="text" placeholder='Post content...' style={{minHeight: '50vh', maxHeight: '50vh', outline: 'none', borderRadius: '3px', backgroundColor: 'transparent', width: "100%", borderColor: '#8b8b8b'}}/>

        <div className='conteiner d-flex flex-row flex-wrap' style={{gap: "10px"}}>
          {fileInputs.map((input, index) => (
            <div key={input.id} className="file-upload" style={{ borderColor: '#6da047', borderStyle:'dashed', position: "relative", overflow: "hidden", minHeight: "20vh", width: "20vh", background: "rgba(109,160,71,0.35)", color: "#6da047", textAlign: "center"}}>
                 <label  style={{ padding: '5vh 5px 7vh 5px',  display: "block", position: "absolute", top: "0", bottom: "0", width: "100%", height: "100%", cursor: "pointer"}}>
                      <input /*name = {`file${input.id}`}*/ style = {{display: 'none'}} type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} />
                      <span style = {{fontSize: '2vh'}} disabled className="filename" id='filename'>{fileInputs[index].file.name}</span>
                 </label>
            </div>
          ))}

          <button type="button" style={{background: "transparent", borderWidth: '0'}} onClick={handleAddFileInput}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
        </div>
          
        <button onClick={handleShow} type="button" className="file-upload" style={{borderRadius: '10px', borderColor: 'rgb(220,20,60)', borderStyle:'solid', position: "relative", overflow: "hidden", minHeight: "100px", width: "25%", background: "rgba(220,20,60,0.35)", color: "rgba(220,20,60)", textAlign: "center"}}>
          Добавить исследования
        </button>


        <Dropdown required onSelect={handleItemClick} drop="down">
          <Dropdown.Toggle variant="primary" id="dropdownMenuDark">
            {selectedTypePost ? selectedTypePost : "Select an item"}
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item eventKey="traning">traning program</Dropdown.Item>
            <Dropdown.Item eventKey="nutrion">nutrion program</Dropdown.Item>
            <Dropdown.Item eventKey="product">products recommended</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

              

        <button type="button" style={{marginLeft: 'auto', width: '10%'}} onClick={handleSubmit}>Upload Post</button>
      </div>
    </form>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Модальное окно</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex flex-row row row-cols-1 row-cols-sm-2 g-3" style={{margin: 10+'px', gap: '20px'}}>
          {Object.keys(research).map(key => (
          <button onClick={(e) => handleChange(key, e)} className="col" key={key} style={{maxWidth: 30+'%'}}>
              <div className="card">
                  <div style={{textAlign: 'center'}} className="card-body">
                     <h5 className="card-title">{research[key].name}</h5>
                     <p  className="card-text">{research[key].content}</p>
                  </div>
              </div>
          </button>
          ))}
        </div>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

