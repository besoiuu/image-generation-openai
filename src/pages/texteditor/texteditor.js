import React, { useState } from "react";
import "./texteditor.css";
import { FcPrevious } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export const TextEditor = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("Hello World");
  const [style, setStyle] = useState({
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#000000",
    fontSize: "16px",
    textAlign: "left",
    lineHeight: "1.5",
    letterSpacing: "0",
  });

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleStyleChange = (property, value) => {
    const obj = {...style}
    if(property === "letterSpacing")obj[property] = value + "px"
    else obj[property] = value;
    setStyle(obj);
  };

  return (
    <>
    <div className="button-back">
      <button className="gen-button" onClick={() => navigate(-1)}>
        <FcPrevious />
      </button>
      </div>
    <div className="editor-ui">
      <div className="editor-controls">
        <label className="editor-label">
          Font Style:
          <select
            className="editor-select"
            value={style.fontStyle}
            onChange={(e) => handleStyleChange("fontStyle", e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </label>
        <br />
        <label className="editor-label">
          Font Weight:
          <select
            className="editor-select"
            value={style.fontWeight}
            onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
          </select>
        </label>
        <br />
        <label className="editor-label">
          Font size:
          <input
            className="editor-input"
            value={style.fontSize.replace("px", "")}
            onChange={(e) =>
              handleStyleChange("fontSize", `${e.target.value}px`)
            }
          />
        </label>
        <br />
        <label className="editor-label">
          Text Align:
          <select
            value={style.textAlign}
            className="editor-select"
            onChange={(e) => handleStyleChange("textAlign", e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </label>
        <br />
        <label className="editor-label">
          Line Height:
          <input
            className="editor-input"
            type="number"
            step="0.1"
            value={style.lineHeight}
            onChange={(e) =>
              handleStyleChange("lineHeight", `${e.target.value}`)
            }
          />
        </label>
        <br />
        <label className="editor-label">
          Letter spacing:
          <input
            type="range"
            className="editor-input-range"
            min="0"
            max="10"
            step="0.1"
            value={style.letterSpacing.split("px")[0]}
            onChange={(e) =>
              handleStyleChange("letterSpacing", e.target.value)
            }
          />
        </label>
        <label className="editor-label">
          Color:
          <div className="color-input">
            <input
              type="color"
              value={style.color}
              onChange={(e) => handleStyleChange("color", e.target.value)}
            />
          </div>
        </label>
      </div>
      <br />
      <div className="text-container">
        <textarea className="input-text" value={text} onChange={handleTextChange} maxLength="40" />
        <div className="output-text" style={style}>
          {text}
        </div>
      </div>
      <div className="css-container">
        <pre>{JSON.stringify(style, null, 2)}</pre>
      </div>
    </div>
    </>
  );
};
