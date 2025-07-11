import React from "react";

export const InputUi = ({ info, usageInfo }) => {
  return (
    <div className="info-ui">
      <label className="label-info">{info}</label>
      <input
        className="input-user"
        onChange={(e) => usageInfo(e.target.value)}
      ></input>
    </div>
  );
};


