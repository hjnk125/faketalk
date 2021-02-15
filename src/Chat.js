import { useState } from 'react';
import './Chat.scss';
import icon from './icon.png';

function Chat(props) {
  const { name, pic } = props;
  const [sender, setSender] = useState("user");
  const [newTalk, setNewTalk] = useState("");
  const [talks, setTalks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    let newTalks = talks.slice();

    const now = new Date();
    let time = now.toTimeString().slice(0, 5);
    let hours = now.getHours();

    let timestamp;
    if (hours < 13) {
      timestamp = `오전 ${time}`
    } else {
      hours = hours - 12;
      timestamp = `오후 ${('0' + hours).slice(-2)}${time.slice(-3)}`
    };


    // 새 톡 내용을 배열에 추가(글이 있을 때)
    if (newTalk !== "") {
      // [["user", "내 톡 내용(노랑 말풍선)", "시간"], ["friend", "친구 톡 내용(흰 말풍선)", "시간"]]
      let tuple = [sender, newTalk, timestamp];
      newTalks.push(tuple);
      if (newTalks[newTalks.length - 2]) {
        // 1분 아직 안 지났으면 마지막 시간만 남도록!
        if (newTalks[newTalks.length - 2][0] === newTalks[newTalks.length - 1][0] && newTalks[newTalks.length - 2][2] === timestamp) {
          newTalks[newTalks.length - 2][2] = "";
        }
        // 첫 톡인 경우 배열 '2'번째 요소로 "first" 문자열 추가
        if (newTalks[newTalks.length - 2][2] !== '') {
          newTalks[newTalks.length - 1].push("first");
        }
      }
      if (newTalks.length === 1) {
        newTalks[newTalks.length - 1].push("first");
      }
      setTalks(newTalks);
      console.log(newTalks);
    }
    // textarea 글자 지우기
    e.target.previousSibling.value = "";
  }

  function handleSender() {
    (sender === "user") ? setSender("friend") : setSender("user");
  };

  function handleSendPic(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => setNewTalk(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="Chat">

      <div className="user_info">
        <img src={pic} />
        <div style={{ marginLeft: "10px" }}>
          <div style={{ margin: "5px" }}>{name}</div>
          <div style={{ color: "darkgray", display: "flex", alignItems: "center", fontSize: "0.7rem", fontWeight: "700" }}><img src={icon} style={{ width: "19px", height: "18px" }} />2</div>
        </div>
      </div>

      <ul className="talks">
        {talks.map((talk, i) => {
          return (
            <li key={i} className={talk[0]}>
              <img className={(talk[3] === "first") ? "pic" : "blank_pic"} src={pic} />
              <div className="texts">
                <span className={(talk[3] === "first") ? "name" : "none"}>{name}</span>
                <div className="bubble_time">
                  <span className="bubble">{
                    (talk[1].slice(0, 4) !== "data") ?
                      talk[1] : (<img className="chat_pic" src={talk[1]}></img>)
                  }</span>
                  <span className="time">{talk[2]}</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <form className="send">

        {/* sender 셋팅, 사진 업로드 기능 */}
        <div className="send_setting">

          <input type="file" accept="image/jpeg, image/jpg, image/png"
            onChange={handleSendPic}
          />

          <label className="toggle">
            <input type="checkbox" onClick={handleSender} />
            <span className="slider"></span>
          </label>
        </div>

        {/* 글 작성, 전송 버튼 */}
        <div className="send_write">
          <textarea type="text" name="talk" onChange={(e) => setNewTalk(e.target.value)} />
          <input type="submit" onClick={handleSubmit} value="전송" />
        </div>
      </form>

    </div>

  );
}

export default Chat;
