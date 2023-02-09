import "./homepage.css";
import { useNavigate } from "react-router-dom";
import testImg from '../../assets/bg/image.gif'

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="top">
        <a>InVision</a>
        <nav className="navWrap">
          <ul>
            <a>About</a>
            <a>Why</a>
            <a>Who</a>
          </ul>
        </nav>
        <button className="gen-button" onClick={() => navigate("/generator")}>
          Try
        </button>
      </div>
      <div className="content">
        <h1>Transform your concepts into reality using AI-created images.</h1>
        <h4>
          Simply enter a prompt and let our tool do the rest. From logos and
          graphics to digital artwork and more, our tool can generate a wide
          range of images that are perfect for any project.
        </h4>
        <div className="content-button">
          <button className="gen-button" onClick={() => navigate("/generator")}>
            Image
          </button>
          <button
            className="gen-button"
            onClick={() => navigate("/gradientgen")}
          >
            Gradient
          </button>
        </div>
        <div className="content-about">
          <img className="content-img" src={testImg}></img>
          <div className="content-text">
            <h2>Unleash your creativity</h2>
            <p>
              Our generator can take any prompt and convert it into images. Give
              it a try!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
