import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcPrevious } from "react-icons/fc";
import { Modal, Button, Form } from "react-bootstrap";
import "./favourite.css"

export const Favourite = () => {
  const galleryFav = localStorage.getItem("savedImg");
  const parsedGallery = galleryFav ? JSON.parse(galleryFav) : [];
  const [images, setImages] = useState([...parsedGallery]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const selectedImgRef = useRef();
  const modalFormRef = useRef();

  const handleDelete = (imageInx) => {
    const temp = [...images];
    temp.splice(imageInx, 1);
    setImages(temp);
    localStorage.setItem("savedImg", JSON.stringify(temp));
    console.log("savedImg");
  };

  const handleEditContentInModal = (img) => {
    setShowModal(true);
    selectedImgRef.current = img;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    selectedImgRef.current = null;
  };

  const handleSaveContent = () => {
    const findSelected = parsedGallery.find(
      (obj) => obj.imgLink === selectedImgRef.current.imgLink
    );
    const title = modalFormRef.current[0].value;
    const contentText = modalFormRef.current[1].value;
    findSelected.title = title === "" ? findSelected.title : title;
    findSelected.contentText =
      contentText === "" ? findSelected.contentText : contentText;
    localStorage.setItem("savedImg", JSON.stringify(parsedGallery));
    setImages(parsedGallery);
    setShowModal(false);
  };

  return (
    <>
      <div className="gallery-wrapper">
        {images.length === 0 && (
          <p>No image saved to favorites, please add images.</p>
        )}
        {images.map((imgUrl, index) => (
          <div className="gallery-image-wrapper" key={imgUrl.imgLink}>
            <button onClick={() => handleDelete(index)}>&#x2715;</button>
            <img
              className="gallery-image"
              src={imgUrl.imgLink}
              key={index}
              alt={imgUrl.title} 
              width="100%"
            />
            <div className="gallery-description">
              <p className="gallery-card-title">{imgUrl.title}</p>
              <button
                onClick={() => handleEditContentInModal(imgUrl)}
                className="gen-button w-100 mt-0"
              >
                Edit Content
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="gen-button" onClick={() => navigate(-1)}>
        <FcPrevious />
      </button>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          style={{ color: "black" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit your content for the picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form ref={modalFormRef}>
              <Form.Group className="mb-3">
                <Form.Label>Edit Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={selectedImgRef.current?.title}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={15}
                  placeholder={selectedImgRef.current?.contentText}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveContent}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
