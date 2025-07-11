import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcPrevious } from "react-icons/fc";
import { Modal, Button, Form } from "react-bootstrap";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase"; // asigură-te că ai un fișier firebase.js exportând `db`
import "./favourite.css";

export const Favourite = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const selectedImgRef = useRef(null);
  const modalFormRef = useRef();

  // 🔄 Load images from Firestore
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "images"));
        const imageList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imageList);
      } catch (error) {
        console.error("Eroare la fetch:", error);
      }
    };

    fetchImages();
  }, []);

  // ❌ Delete image from Firestore
  const handleDelete = async (imageId) => {
    try {
      await deleteDoc(doc(db, "images", imageId));
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    }
  };

  const handleEditContentInModal = (img) => {
    setShowModal(true);
    selectedImgRef.current = img;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    selectedImgRef.current = null;
  };

  const handleSaveContent = async () => {
    const title = modalFormRef.current[0].value;
    const contentText = modalFormRef.current[1].value;

    try {
      await updateDoc(doc(db, "images", selectedImgRef.current.id), {
        title: title || selectedImgRef.current.title,
        contentText: contentText || selectedImgRef.current.contentText || "",
      });

      setImages((prev) =>
        prev.map((img) =>
          img.id === selectedImgRef.current.id
            ? {
                ...img,
                title: title || img.title,
                contentText: contentText || img.contentText || "",
              }
            : img
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Eroare la actualizare:", error);
    }
  };

  return (
    <>
      <div className="gallery-wrapper">
        {images.length === 0 && (
          <p>No image saved to favorites, please add images.</p>
        )}
        {images.map((img) => (
          <div className="gallery-image-wrapper" key={img.id}>
            <button onClick={() => handleDelete(img.id)}>&#x2715;</button>
            <img
              className="gallery-image"
              src={img.imgLink}
              alt={img.title}
              width="100%"
            />
            <div className="gallery-description">
              <p className="gallery-card-title">{img.title}</p>
              <button
                onClick={() => handleEditContentInModal(img)}
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
                defaultValue={selectedImgRef.current?.title}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                defaultValue={selectedImgRef.current?.contentText}
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
    </>
  );
};
