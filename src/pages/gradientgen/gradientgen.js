import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcPrevious } from "react-icons/fc";
import "./gradientgen.css"

export const GradientGenerator = () => {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#ffff00");
  const [angle, setAngle] = useState(45);
  const [type, setType] = useState("linear");
  const [transition, setTransition] = useState("ease");
  const [transitionTime, setTransitionTime] = useState(1);
  const navigate = useNavigate();

  const gradientStyle = {
    background:
      type === "linear"
        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`,
    height: "150px",
    width: "600px",
    transition: `background ${transition} ${transitionTime}s`,
  };

  const handleColor1Change = (event) => {
    setColor1(event.target.value);
  };

  const handleColor2Change = (event) => {
    setColor2(event.target.value);
  };

  const handleAngleChange = (event) => {
    setAngle(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleTransitionChange = (event) => {
    setTransition(event.target.value);
  };

  const handleTransitionTimeChange = (event) => {
    setTransitionTime(event.target.value);
  };

  return (
    <div className="gradient-ui">
      <div className="gradient-output" style={gradientStyle} />
      <br />
      <div className="gradient-controls">
        <div className="color-input">
          <input type="color" value={color1} onChange={handleColor1Change} />
        </div>
        <div className="color-input">
          <input type="color" value={color2} onChange={handleColor2Change} />
        </div>
      </div>
      <br />
      <div className="angle-ui">
        <label className="angle-label">Angle:</label>
        <input
          type="number"
          className="angle-input"
          value={angle}
          onChange={handleAngleChange}
          disabled={type === "radial"}
        />
        <br />
        <label className="select-label">Type:</label>
        <select
          value={type}
          className="select-type"
          onChange={handleTypeChange}
        >
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </div>
      <br />
      <div className="transition-ui">
        <label className="transition-label">Transition:</label>
        <select
          value={transition}
          className="select-transition"
          onChange={handleTransitionChange}
        >
          <option value="ease">ease</option>
          <option value="linear">linear</option>
          <option value="ease-in">ease-in</option>
          <option value="ease-out">ease-out</option>
          <option value="ease-in-out">ease-in-out</option>
        </select>
      </div>
      <br />
      <div className="time-ui">
        <label className="time-label">Transition time:</label>
        <input
          type="number"
          className="time-input"
          value={transitionTime}
          onChange={handleTransitionTimeChange}
        />
        seconds
      </div>
      <br />
      <div className="output-div">
        <label htmlFor="output">Your css code:</label>
        <textarea
          className="textarea-output"
          id="output"
          name="output"
          rows="5"
          cols="50"
          readOnly
          value={`background: ${
            type === "linear"
              ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
              : `radial-gradient(circle, ${color1}, ${color2})`
          };
            transition: background ${transition} ${transitionTime}s;
            height: 200px;
            width: 100%;`}
        />
      </div>
      <button className="gen-button" onClick={() => navigate(-1)}>
        <FcPrevious />
      </button>
    </div>
  );
};
