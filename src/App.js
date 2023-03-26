import './App.css';
import { useState,useEffect } from "react";
import Test1 from './Test1';

function App() {

  const [result, setResult] = useState(null);

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today?"
  }, {
    user: "me",
    message: "Send a picture or type what you want to know"
  }]);

  async function handleSubmit(e) {
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}` }]);
    setInput("");
    const messages = [...chatLog, { user: "me", message: `Make a essay about ${input} in English` }]
      .map((message) => message.message)
      .join("\n");
    console.log(chatLog)
    // http://localhost:3080
    // https://img-desc-app.herokuapp.com
    // https://imagedesc-app-back-second.onrender.com
    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });
    const data = await response.json();
    // console.log(data.message)
    setChatLog([...chatLog, { user: "gpt", message: `${data.message}` }]);
  }

  useEffect(() => {
    async function handleSubmitSecond() {
      setChatLog([...chatLog, { user: "me", message: `${result}` }]);
      setInput("");
      const messages = [...chatLog, { user: "me", message: `Make a essay about ${result} in English` }]
        .map((message) => message.message)
        .join("\n");
      console.log(chatLog)
      // http://localhost:3080
      // https://img-desc-app.herokuapp.com
      // https://imagedesc-app-back-second.onrender.com
      const response = await fetch("http://localhost:3080", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messages
        })
      });
      const data = await response.json();
      // console.log(data.message)
      setChatLog([...chatLog, { user: "gpt", message: `${data.message}` }]);
    }
    if(result){
      handleSubmitSecond()
    }
}, [result]);

  return (
    <div className="App">
      <section className="chatBox">
        <div className="chatLog">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message}></ChatMessage>
          ))}
        </div>

        <div className="chatInputHolder">

          <Test1 result={result} setResult={setResult}/>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <form onSubmit={handleSubmit}>
            <input className="chatInputTextarea" placeholder="Type here" rows="1"
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
      <div className="message">
        {message.message}
      </div>
    </div>
  )
}

export default App;
