import { useEffect, useState, useRef } from "react";
import "./App.css";
import placeholder from "./assets/img/placeholder.png";
import logo from "./assets/img/Logo.svg";
import logoMobile from "./assets/img/logo-mobile.svg";
import add from "./assets/img/Add.svg";
import want from "./assets/img/Want.svg";
import github from "./assets/img/github-mark-white.svg";
import { ajax } from "rxjs/ajax";
import { fromEvent } from "rxjs";
import {
  scan,
  map,
  switchMap,
  takeWhile,
  concatMap,
  debounceTime,
} from "rxjs/operators";

function App() {
  //RXJS
  const [data, setData] = useState("");
  // timeout not ideal but temp fix for allowing dom to load before trying to find selector and failing.
  let navSelector;
  setTimeout(() => {
    navSelector = document.querySelector(".crown-zenith");
    fromEvent(navSelector, "click")
      .pipe(
        concatMap(() =>
          ajax({
            url: "https://api.pokemontcg.io/v2/cards?q=set.id:swsh12pt5gg",
            method: "GET",
            headers: {
              "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
            },
          })
        )
      )
      .subscribe((value) => setData(value));
  }, 10000);
  console.log("data from useState", data);
  // REACT //
  /*const [windowSize, setWindowSize] = useState(window.innerWidth);

  const windowSizeSetting = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", windowSizeSetting);
  }, [windowSize]);*/

  return (
    <>
      <div className="main-container">
        <nav className="navigation">
          <div id="pocket-collector-logo">
            <img src={logo} alt="Pocket Collector" className="brand-logo" />
          </div>
          <ul>
            {/*<li>
              <h3>Sword & Shield Sets</h3>
  </li>*/}
            <li className="crown-zenith">Crown Zenith</li>
            <li>Silver Tempest</li>

            <li>Lost Origin</li>
            <li>Pokemon Go</li>
            <li>Astral Radiance</li>
            <li>Brilliant Stars</li>
            {/* <li>Fusion Strike</li>
            <li>Celebrations</li>
            <li>Evolving Skies</li>
            <li>Chilling Reign</li>
            <li>Battle Styles</li>
            <li>Shining Fates</li>
            <li>Vivid Voltage</li>
            <li>Champion's Path</li>
            <li>Darkness Ablaze</li>
            <li>Rebel Clash</li>
  <li>Sword & Shield</li>*/}
          </ul>
          <footer>
            <img src={github} alt="Github" />
          </footer>
        </nav>
        <section className="results">
          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>

          <div className="placeholder">
            <img
              src={placeholder}
              alt="placeholder"
              className="placeholder-image"
            />
            <div className="details-interaction">
              <div className="details">
                <div className="name">Deoxys</div>
                <div className="number">GG12/GG70</div>
                <div className="base">Sword & Shield</div>
                <div className="sub">Crown Zenith</div>
              </div>
              <div className="interaction">
                <div className="icons">
                  <div className="icon-want">
                    <img src={want} alt="want this card" />
                  </div>
                  <div className="icon-have">
                    <img src={add} alt="add this card" />
                  </div>
                </div>
                <div className="release">2023</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
