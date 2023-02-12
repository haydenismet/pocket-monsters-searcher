import { useEffect, useState, useRef } from "react";
import "./App.css";
import placeholder from "./assets/img/placeholder.png";
import logo from "./assets/img/Logo.svg";
import logoMobile from "./assets/img/logo-mobile.svg";
import add from "./assets/img/Add.svg";
import want from "./assets/img/Want.svg";
import github from "./assets/img/github-mark-white.svg";
import { ajax } from "rxjs/ajax";
import { fromEvent, Observable } from "rxjs";
import { map, concatMap, switchMap, tap, filter } from "rxjs/operators";

function App() {
  /* SETUP */
  // getCards API
  const [cards, setCards] = useState();
  // getSets API
  const [navigationList, setNavigationList] = useState("");
  // Get window.innerWidth
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  // Loads nav without breaking React render
  const navSelector = useRef([]);
  // Set the matching selected navList ref for API call
  const [selectedCall, setSelectedCall] = useState();

  /* Gets all sets for navigation list */
  const getAllSets$ = ajax({
    url: "https://api.pokemontcg.io/v2/sets",
    method: "GET",
    headers: {
      "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
    },
  }).pipe(
    // having to nest && return maps/filters due to object itself being nested.
    map((val) => {
      return val.response.data.filter(
        (item) =>
          item.series === "Sword & Shield" && item.name.includes("Gallery")
      );
    }),
    map((val) => {
      val.reverse();
      return val.map(({ name, id }) => ({ name, id }));
    })
  );
  // useEffect run x1 rerender on subscribe.
  useEffect(() => {
    getAllSets$.subscribe({
      next: (value) => setNavigationList(value),
      complete: () => console.log("Completed navigationList"),
    });
  }, []);

  /* Currently gets all cards on click for crown zenith trainer gallery
  useEffect encapsulates whole for useRef selector  */
  useEffect(() => {
    const renderCards$ = fromEvent(navSelector.current, "click").pipe(
      //tap((val) => console.log(val.target.id)),
      map((val) => {
        return val.target.id;
      }),
      switchMap((val) =>
        ajax({
          url: `https://api.pokemontcg.io/v2/cards?q=set.id:${val}`,
          method: "GET",
          headers: {
            "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
          },
        })
      ),
      map((val) => val.response)
    );

    renderCards$.subscribe({
      next: (value) => setCards(value),
      complete: () => console.log("Completed cards"),
    });
  });

  /* Desktop or Mobile Logo setting */
  const windowSizeSetting = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", windowSizeSetting);
  }, [windowSize]);

  return (
    <>
      <div className="main-container">
        <nav className="navigation">
          <div id="pocket-collector-logo">
            <img
              src={windowSize > 768 ? logo : logoMobile}
              alt="Pocket Collector"
              className="brand-logo"
            />
          </div>
          <ul>
            {navigationList
              ? navigationList.map((nav, index) => {
                  return (
                    <li
                      key={index}
                      id={nav.id}
                      className="generated-nav"
                      ref={(element) => {
                        navSelector.current[index] = element;
                      }}
                    >
                      {nav.name}
                    </li>
                  );
                })
              : "Select a set."}
          </ul>
          <footer>
            <img src={github} alt="Github" />
          </footer>
        </nav>
        <section className="results">
          {cards
            ? cards.data.map((card, i) => {
                return (
                  <>
                    <div className="placeholder" key={i}>
                      <img
                        src={card.images.small}
                        alt="placeholder"
                        className="placeholder-image"
                      />
                      <div className="details-interaction">
                        <div className="details">
                          <div className="name">{card.name}</div>
                          <div className="number">{card.number}</div>
                          <div className="base">{card.set.series}</div>
                          <div className="sub">{card.set.name}</div>
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
                          <div className="release">{card.set.releaseDate}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            : "Select set to start."}
        </section>
      </div>
    </>
  );
}

export default App;
