import { useState, useRef, useEffect } from "react";
import { InputUi } from "../../components/inputUi/inputUi";
import { useNavigate } from "react-router-dom";
import { createImage } from "../../services/stabilityai";
import { Button } from "react-bootstrap";
import { FcLike, FcSearch, FcGallery, FcPrevious } from "react-icons/fc";
import { Spinner } from "react-bootstrap";
import Popup from "../../components/pop-up/popup";

export const ImageGenerator = () => {
  const [userInput, setUserInput] = useState("");
  const [responseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const listRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("savedImg");
    if (storedData) {
      listRef.current = JSON.parse(storedData);
    }
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


  const saveImg = () => {
    const galleryFav = localStorage.getItem("savedImg");
    const parsedGallery = galleryFav ? JSON.parse(galleryFav) : [];
    const foundImg = parsedGallery.find(
      (imgObj) => imgObj.imgLink === responseData
    );
    if (responseData && responseData !== "" && foundImg === undefined) {
      listRef.current.push({
        imgLink: responseData,
        title: userInput,
      });
      localStorage.setItem("savedImg", JSON.stringify(listRef.current));
      setShowPopup(true);
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
