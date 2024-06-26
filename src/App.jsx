import { useEffect, useRef, useState } from "react";
import bot from "./Bot";
import "./App.css";
// Открыть вклад Управляемый
function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [errorRequest, setErrorRequest] = useState(false);

  const messagesEndRef = useRef(null);

  const onSend = async (e) => {
    e.preventDefault();
    setMessages((m) => [...m, { type: "client", text }]);
    setText("");

    const response = await bot.request(text, { error: errorRequest });
    setMessages((m) => [...m, { type: "bot", text: response }]);
  };

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container">
      <div className="toolbar">
        <input
          id="errorRequest"
          type="checkbox"
          value={errorRequest}
          onChange={() => setErrorRequest(!errorRequest)}
        />
        <label htmlFor="errorRequest">Ошибка при запросе списка вкладов</label>
      </div>
      <ul className="message-list">
        {messages.map((message, idx) => (
          <li
            key={idx}
            className={`${
              message.type === "client"
                ? "message__container_client"
                : "message__container_bot"
            }`}
          >
            <p
              className={`message ${
                message.type === "client" ? "message_client" : "message_bot"
              }`}
            >
              {formatMessage(message.text)}
            </p>
            <p className="message__sign">
              {message.type === "client" ? "Вы" : "Бот"}
            </p>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form className="footer" onSubmit={onSend}>
        <input
          type="text"
          value={text}
          placeholder="Ввести запрос"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={!text}>
          Отправить
        </button>
      </form>
    </div>
  );
}

function formatMessage(text) {
  const lines = text.split("\n");
  if (lines.length === 1) {
    return lines[0];
  }

  return lines.map((line, idx) => (
    <span key={idx}>
      <span>{line}</span>
      {idx + 1 < lines.length && <br />}
    </span>
  ));
}

export default App;
