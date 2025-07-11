import "./homepage.css";
import { useNavigate } from "react-router-dom";
import testImg from "../../assets/bg/image.gif";
import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import  invisionlogo  from "../../assets/logo/invisionlogoblue.png";

export const Homepage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="page">
      <div className="top">
        <img className="w-25" src={invisionlogo} alt="invisionLogo"/>
        <div className="menu-icon" onClick={toggleMenu}>
          <FcMenu />
        </div>
        {/* <nav className={showMenu ? "navWrap active" : "navWrap"}> */}
        <nav className="navWrap active">
          <ul>
            <a href="https://github.com/besoiuu/image-generation-openai">About</a>
            <a href="https://github.com/besoiuu">Why</a>
            <a href="https://besoiuuworks.netlify.app">Who</a>
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
          <button
            className="gen-button"
            onClick={() => navigate("/texteditor")}
          >
            Text
          </button>
        </div>
        <div className="content-about">
          <img className="content-img" src={testImg} alt="testImage"></img>
          <div className="content-text">
            <h2>Unleash your creativity</h2>
            <p>
              Our generator can take any prompt and convert it into images. Give
              it a try!
            </p>
          </div>
        </div>
      </div>
      <div className="about-section">
        <div className="introduction">
          <p>
            Our Image & Text Editor with Gradient Generator App is a
            comprehensive tool designed to help users generate images, edit
            text, and access gradients easily in one place. With this app, users
            can create custom designs for their creative projects, social media
            posts, and other design-related tasks.
          </p>
        </div>
        <div className="benefits">
          <p>Benefits:</p>
          <ul>
            <li>
              Easy-to-use interface: The app has a simple and user-friendly
              interface, making it easy for users to navigate and use its
              features.
            </li>
            <li>
              Customizable: The interface is highly customizable, allowing users
              to adjust it to their liking and create unique designs.
            </li>
            <li>
              Saves time: The app helps users save time by providing a
              one-stop-shop for generating images, editing text, and creating
              gradients.
            </li>
            <li>
              Accessible: The app is available on both iOS and Android platforms
              and is optimized for both mobile and tablet devices.
            </li>
          </ul>
        </div>
        <div className="shorts">
          <p>Corner Cuts:</p>
          <ul>
            <li>
              Limited Features: The app may not have all the advanced features
              that a professional designer may require.
            </li>
            <li>
              Dependence on Dalle API: The app requires a Dalle API Key to be
              added to the .env file to work, which may limit its use for some
              users.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
