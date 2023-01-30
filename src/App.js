import logo from "./logo.svg";
import "./App.css";
import placeholder from "./assets/img/placeholder.png";

function App() {
  return (
    <>
      <div className="main-container">
        <nav className="navigation">
          <div id="pocket-collector-logo">Logo</div>
          <ul>
            <li>
              <h3>Sword & Shield Sets</h3>
            </li>
            <li>Crown Zenith</li>
            <li>Silver Tempest</li>
            <li>Lost Origin</li>
            <li>Pokemon Go</li>
            <li>Astral Radiance</li>
            <li>Brilliant Stars</li>
            <li>Fusion Strike</li>
            <li>Celebrations</li>
            <li>Evolving Skies</li>
            <li>Chilling Reign</li>
            <li>Battle Styles</li>
            <li>Shining Fates</li>
            <li>Vivid Voltage</li>
            <li>Champion's Path</li>
            <li>Darkness Ablaze</li>
            <li>Rebel Clash</li>
            <li>Sword & Shield</li>
          </ul>
          <footer>hayden ismet</footer>
        </nav>
        <section className="results">
          <h1>Crown Zenith</h1>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Name</div>
                <div className="number">001/198</div>
                <div className="base">Base Set</div>
                <div className="sub">Sub Set</div>
                <div className="release">Release</div>
              </div>
              <div className="interaction">
                <div className="icon-want">Want</div>
                <div className="icon-want">Have</div>
              </div>
            </div>
          </div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>

          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>

          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </section>
      </div>
    </>
  );
}

export default App;
