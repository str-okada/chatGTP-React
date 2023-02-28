// import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today?"
  }, {

    user: "me",
    message: "I want to use ChatGPT today"
  }]);

  async function handleSubmit(e) {
    e.preventDefault();
    await setChatLog([...chatLog, { user: "me", message: `${input}` }]);
    await setInput("");
    const messages = chatLog.map((message) => message.message).join("\n")
    console.log(chatLog)
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    })
    const data = await response.json();
    console.log(data.message)
    setChatLog([...chatLog,{user:"gtp",message:`${data.message}`}])
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenuButton">
          <span> + </span>
          New Chat
        </div>
      </aside>

      <section className="chatBox">
        <div className="chatLog">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message}></ChatMessage>
          ))}
        </div>

        <div className="chatInputHolder">
          <form onSubmit={handleSubmit}>
            <input className="chatInputTextarea" placeholder="Type your message here" rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chatMessage ${message.user === "gpt" && "chatgpt"}`}>
      <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
      </div>
      <div className="message">
        {message.message}
      </div>
    </div>
  )
}

export default App;
