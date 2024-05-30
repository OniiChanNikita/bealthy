import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';

export const UploadPost = () => {
  if (localStorage.getItem('access_token') === null) {
    window.location.href = '/login';
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLogo, setImageLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [fileNameLogo, setFileNameLogo] = useState('Выбрать логотип публикации');
  const [fileInputs, setFileInputs] = useState([{ id: 1, file: { name: 'Выбрать изображения к публикации' } }]);
  const [showModal, setShowModal] = useState(false);
  const [appendResearch, setAppendResearch] = useState([]);
  const [research, setResearch] = useState([]);
  const [selectedTypePost, setSelectedTypePost] = useState(null);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await axios.get('http://localhost:8000/research/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setResearch(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (showModal) {
      fetchResearch();
    }
  }, [showModal]);

  const handleItemClick = (item) => setSelectedTypePost(item);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  const handleResearchChange = (key) => {
    const researchName = research[key].name;
    setAppendResearch((prev) =>
      prev.includes(researchName)
        ? prev.filter((item) => item !== researchName)
        : [...prev, researchName]
    );
  };

  const handleImageChangeLogo = (e) => {
    const selectedFile = e.target.files[0];
    setImageLogo(selectedFile);
    setFileNameLogo(selectedFile ? `Выбран файл: ${selectedFile.name}` : 'Выбрать логотип публикации');
  };

  const handleImageChange = (index, e) => {
    const selectedFile = e.target.files[0];
    const updatedImages = [...images];
    updatedImages[index] = selectedFile;
    setImages(updatedImages);

    const updatedFileInputs = [...fileInputs];
    updatedFileInputs[index].file = selectedFile || { name: 'Выбрать изображения к публикации' };
    setFileInputs(updatedFileInputs);
  };

  const handleAddFileInput = () => setFileInputs([...fileInputs, { id: fileInputs.length + 1, file: { name: 'Выбрать изображения к публикации' } }]);

  const handleSubmit = async () => {
    if (!imageLogo || !title || !description || !selectedTypePost) {
      return alert('Вы не ввели все данные');
    }

    const formData = new FormData();
    formData.append('imageLogo', imageLogo);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('researches', appendResearch);
    formData.append('selectedTypePost', selectedTypePost);
    images.forEach((image, i) => formData.append(`image${i}`, image));

    try {
      const response = await axios.post('http://localhost:8000/post/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (response) {
        window.location.href = '/';
      }
    } catch (e) {
      console.log('Upload failed', e);
    }
  };

  return (
    <div className="container my-5 p-5" style={{ borderRadius: '5px', borderWidth: '2px', borderColor: '#C0C0C0', borderStyle: 'solid', backgroundColor: '#F3F4E9' }}>
      <Form className="d-flex flex-column" encType="multipart/form-data">
        <div className="file-upload text-center p-5 mb-3" style={{ borderColor: '#6da047', borderStyle: 'dashed', backgroundColor: 'rgba(109,160,71,0.35)', color: '#6da047' }}>
          <Form.Label className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ cursor: 'pointer' }}>
            <Form.Control type="file" accept="image/*" onChange={handleImageChangeLogo} style={{ display: 'none' }} />
            <span className="filename" style={{ fontSize: '1.5rem' }}>{fileNameLogo}</span>
          </Form.Label>
        </div>
        <Form.Group className="mb-3">
          <Form.Control value={title} onChange={handleTitleChange} placeholder="Title..." style={{ borderBottom: '2px solid #8b8b8b' }} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} placeholder="Post content..." style={{ minHeight: '200px', borderColor: '#8b8b8b' }} />
        </Form.Group>
        <div className="d-flex flex-wrap mb-3">
          {fileInputs.map((input, index) => (
            <div key={input.id} className="file-upload p-3 m-1" style={{ borderColor: '#6da047', borderStyle: 'dashed', backgroundColor: 'rgba(109,160,71,0.35)', color: '#6da047', width: '150px', height: '150px', position: 'relative', overflow: 'hidden' }}>
              <Form.Label className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ cursor: 'pointer' }}>
                <Form.Control type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} style={{ display: 'none' }} />
                <span className="filename" style={{ fontSize: '1rem' }}>{input.file.name}</span>
              </Form.Label>
            </div>
          ))}
          <Button variant="outline-success" onClick={handleAddFileInput} className="d-flex justify-content-center align-items-center" style={{ width: '150px', height: '150px', marginTop: '4px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </Button>
        </div>
        <Button variant="outline-danger" onClick={handleShow} className="mb-3">
          Добавить исследования
        </Button>
        <Dropdown onSelect={handleItemClick} className="mb-3">
          <Dropdown.Toggle variant="primary">
            {selectedTypePost || 'Select an item'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="traning">traning program</Dropdown.Item>
            <Dropdown.Item eventKey="nutrion">nutrion program</Dropdown.Item>
            <Dropdown.Item eventKey="product">products recommended</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={handleSubmit} style={{ alignSelf: 'flex-end' }}>
          Upload Post
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Модальное окно</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap">
            {research.map((item, index) => (
              <Button key={index} variant="outline-primary" onClick={() => handleResearchChange(index)} className="m-2" style={{ flex: '1 0 30%' }}>
                <div className="text-center">
                  <h5>{item.name}</h5>
                  <p>{item.content}</p>
                </div>
              </Button>
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
