import logo from './logo.svg';
import './App.css';

function App() {
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
          <div className="chatMessage">
            <div className="avatar">
              Me
            </div>
            <div className="message">
              Hello World
            </div>
          </div>
        </div>

        <div className="chatInputHolder">
          <textarea className="chatInputTextarea" placeholder="Type your message here" rows="1"></textarea>
        </div>
      </section>
    </div>
  );
}

export default App;
