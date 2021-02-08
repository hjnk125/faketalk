import { useState } from 'react';
import './Chat.scss';

function Chat(props) {
  const { name, pic } = props;
  const [sender, setSender] = useState("user");
  const [newTalk, setNewTalk] = useState("");
  const [talks, setTalks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    let newTalks = talks.slice();
    // 새 톡 내용을 배열에 추가
    // [["user", "내가 말한 거(노랑 말풍선)"], ["friend", "친구가 말한거(흰 말풍선)"]]
    let tuple = [sender, newTalk];
    newTalks.push(tuple);
    setTalks(newTalks);

    console.log(newTalks);
  }

  function handleSender() {
    (sender === "user") ? setSender("friend") : setSender("user");
  };

  return (
    <div className="Chat">

      <div className="preview">
        <div className="user_info">
          <img src={pic} />
          <span>{name}</span>
        </div>

        <ul className="talks">
          {talks.map((talk, i) => {
            return (
              <li key={i} className={talk[0]}>{talk[1]}</li>
            )
          })}
        </ul>

        <form className="send">
          <input type="checkbox" onClick={handleSender} />
          <input type="text" name="talk" onChange={(e) => setNewTalk(e.target.value)} />
          <input type="submit" onClick={handleSubmit} />
        </form>
      </div>
    </div>

  );
}

export default Chat;
