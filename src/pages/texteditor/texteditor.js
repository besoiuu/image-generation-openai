import React, { useState } from "react";
import "./texteditor.css"

export const TextEditor = () => {
  const [text, setText] = useState("Hello World");
  const [style, setStyle] = useState({
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'black',
  });

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleStyleChange = (property, value) => {
    setStyle({
      ...style,
      [property]: value,
    });
  };

  return (
    <div className="editor-ui">
      <textarea id="editor-input" value={text} onChange={handleTextChange} />
      <br />
      <div className="editor-controls">
        <label className="editor-label">
          Font Style:
          <select className="editor-select"
            value={style.fontStyle}
            onChange={(e) => handleStyleChange('fontStyle', e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </label>
        <br />
        <label className="editor-label">
          Font Weight:
          <select className="editor-select"
            value={style.fontWeight}
            onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </label>
        <br />
        <label className="editor-label">
          Color:
          <select className="editor-select"
            value={style.color} 
            onChange={(e) => handleStyleChange('color', e.target.value)}
          >
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </label>
      </div>
      <br />
      <div className="editor-output" style={style}>{text}</div>
    </div>
  );
};
