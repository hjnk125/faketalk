import { useState } from 'react';
import './Chat.scss';

function Chat(props) {
  const { name, pic } = props;
  const [newTalk, setNewTalk] = useState("");
  const [talks, setTalks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    let newTalks = talks.slice();
    // 새 톡 내용을 배열에 추가
    newTalks.push(newTalk);
    setTalks(newTalks);

  }

  return (
    <div className="Chat">

      <div className="preview">
        <div className="user">
          <img src={pic} />
          <span>{name}</span>
        </div>

        <ul className="talks">
          {talks.map((talk, i) => {
            return (
              <li key={i}>{talk}</li>
            )
          })}
        </ul>

        <form className="send">
          <input type="text" name="talk" onChange={(e) => setNewTalk(e.target.value)} />
          <input type="submit" onClick={handleSubmit} />
        </form>
      </div>
    </div>

  );
}

export default Chat;
