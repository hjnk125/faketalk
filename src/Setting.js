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
      <div>
        How to:<br />
      1. 대화 전 톡을 나눌 친구의 이름과 프로필 사진을 설정해주세요. <br />
      2. 전송버튼 위의 스위치를 이용해 톡을 보내는 사람을 설정할 수 있습니다. <br />
      3. 사진을 전송할 때에는 사진을 업로드 후 전송버튼을 눌러주세요. <br />
      </div>
      <br />
      <div className="profile_name">
        <div>프로필 이름 변경:</div>
        <input type="text" onChange={(e) => setTempName(e.target.value)} />
        <input type="submit" onClick={(e) => { setName(tempName) }} />
      </div>
      <br />
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
