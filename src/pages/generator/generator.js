import { useState, useRef, useEffect } from "react";
import { InputUi } from "../../components/inputUi/inputUi";
import { useNavigate } from "react-router-dom";
import { createImage } from "../../services/stabilityai";
import { Button } from "react-bootstrap";
import { FcLike, FcSearch, FcGallery, FcPrevious } from "react-icons/fc";
import { Spinner } from "react-bootstrap";
import Popup from "../../components/pop-up/popup";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

export const ImageGenerator = () => {
  const [userInput, setUserInput] = useState("");
  const [responseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const listRef = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSavedImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imageList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        listRef.current = imageList;
      } catch (error) {
        console.error("Eroare la citirea imaginilor din Firestore:", error);
      }
    };

    fetchSavedImages();
  }, []);

  const generateImage = async () => {
    if (!userInput || userInput.trim() === "") {
      alert("Te rog introdu un prompt valid!");
      return;
    }

    setLoading(true);
    setResponseData(undefined);

    try {
      const imageResult = await createImage(userInput); // ← PASĂM userInput
      setResponseData(imageResult);
    } catch (error) {
      console.error("Eroare:", error.message);
      alert("A apărut o eroare: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const exists = listRef.current.some((img) => img.imgLink === responseData);
  if (exists) {
    alert("Această imagine este deja salvată.");
    return;
  }

  const saveImg = async () => {
    if (!responseData || responseData === "") return;

    try {
      // Creăm un path unic pentru imagine
      const imageId = uuidv4();
      const storageRef = ref(storage, `images/${imageId}.png`);

      // Încarcăm imaginea (care e deja base64) în Firebase Storage
      await uploadString(storageRef, responseData, "data_url");

      // Obținem URL-ul public
      const downloadURL = await getDownloadURL(storageRef);

      // Salvăm doar linkul în Firestore
      await addDoc(collection(db, "images"), {
        imgLink: downloadURL,
        title: userInput,
        createdAt: new Date(),
      });

      setShowPopup(true);
    } catch (error) {
      console.error("Eroare la salvare în Firestore:", error);
      alert("A apărut o eroare la salvarea imaginii.");
    }
  };

  return (
    <div className="wrapper">
      <div className="gradient"></div>
      {responseData && (
        <img src={responseData} className="image" alt="ai generated" />
      )}
      {loading && (
        <Spinner className="spinner" animation="border" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <InputUi info={"I wanna see"} usageInfo={setUserInput} />
      <div className="button-wrapper">
        <Button
          className="gen-button"
          variant="primary"
          onClick={generateImage}
        >
          <FcSearch />
        </Button>
        <Button className="gen-button" variant="primary" onClick={saveImg}>
          <FcLike />
        </Button>
        <Button
          className="gen-button"
          variant="primary"
          onClick={() => navigate("/favourite")}
        >
          <FcGallery />
        </Button>
        <Popup onClose={() => setShowPopup(false)} show={showPopup}></Popup>
      </div>
      <div className="back-button-wrapper">
        <Button
          className="gen-button"
          variant="primary"
          onClick={() => navigate(-1)}
        >
          <FcPrevious />
        </Button>
      </div>
    </div>
  );
};
