import React, { createContext, useMemo, useState } from 'react';
import './Setting.scss';

function Setting(props) {
  const { setName, setPic } = props;
  const [tempName, setTempName] = useState("");

  function handleFileOnChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => setPic(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="Setting">
      <div className="profile_name">
        <div>프로필 이름 변경:</div>
        <input type="text" onChange={(e) => setTempName(e.target.value)} />
        <input type="submit" onClick={(e) => { setName(tempName) }} />
      </div>
      <div className="profile_pic">
        <div>프로필 사진 변경:</div>
        <input type="file" accept="image/jpeg, image/jpg, image/png"
          onChange={(e) => setPic(handleFileOnChange(e))}
        />
      </div>
    </div>
  );
}

export default Setting;
