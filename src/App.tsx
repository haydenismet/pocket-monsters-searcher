import { useEffect, useState, useRef } from "react";
import "./App.css";
import logo from "./assets/img/Logo.svg";
import add from "./assets/img/Add.svg";
import want from "./assets/img/Want.svg";
import github from "./assets/img/github-mark-white.svg";
import loadSpinner from "./assets/img/load-cards-spinner.svg";
import { ajax } from "rxjs/ajax";
import { fromEvent, throwError } from "rxjs";
import * as RX from "rxjs/operators";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import * as O from "fp-ts/lib/Option";
import React from "react";

import { flow, pipe } from "fp-ts/lib/function";

/* 
useObservableState?
O. Option/Fold/Some?/FoldXState?

*/

function App() {
  /*****************SETUP*********************/

  //?

  // getCards API
  const [cards, setCards] = useState();
  // getSets API
  const [navigationList, setNavigationList] = useState("");
  // Loads nav without breaking React render
  const navSelector = useRef([]);

  /********************************************/

  // const getSetList = (setUrl: string): TE.TaskEither<Error, SetData> => {
  //   return TE.tryCatch(
  //     () =>
  //       fetch(setUrl, {
  //         method: "GET",
  //         headers: {
  //           "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
  //         },
  //       }).then((res) => {
  //         if (!res.ok) {
  //           throw new Error(`Fetch failed with status : ${res.status}`);
  //         }
  //         return res.json();
  //       }),
  //     E.toError
  //   );
  // };

  // const getSetListFull = pipe(
  //   getSetList("https://api.pokemontcg.io/v2/sets"),
  //   TE.fold(
  //     (e) => T.of(`oh no, an error occurred: ${e.message}`),
  //     (sets) => T.of(`sets recovered succesfully, number of sets are: ${sets}`)
  //   )
  // );

  // const renderData = () =>
  //   pipe(getSetListFull(), (val) => console.log(JSON.parse(val)));

  // renderData();

  // console.log(getSetListFull());

  // FPTS :: TaskEither
  const getAllSets$ = ajax({
    url: "https://api.pokemontcg.io/v2/sets",
    method: "GET",
    headers: {
      "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
    },
  }).pipe(
    // FPTS :: FPTS Pipe, Map, Fold
    RX.catchError(() => {
      return throwError(
        () => new Error("Could not fetch navigation list from API")
      );
    }),
    RX.map((val) => {
      return val.response.data.filter(
        (item) =>
          item.series === "Sword & Shield" && item.name.includes("Gallery")
      );
    }),
    RX.map((val) => {
      val.reverse();
      return val.map(({ name, id }) => ({ name, id }));
    })
  );

  // ?
  useEffect(() => {
    getAllSets$.subscribe({
      next: (value) => setNavigationList(value),
      complete: () => console.log("COMPLETE: navSubscription"),
      error: (e) => {
        console.log("ERROR: navSubscription", e);
      },
    });
  }, []);

  /*****************************************************************/

  /**********************RENDER_CARDS_API**************************/

  //?
  const renderCards$ = fromEvent(navSelector.current, "click").pipe(
    //tap((val) => console.log(val.target.id)),
    RX.catchError(() => {
      return throwError(() => new Error("Could not fetch selector from DOM"));
    }),
    RX.map((val) => {
      return val.target.id;
    }),
    RX.switchMap((val) =>
      ajax({
        url: `https://api.pokemontcg.io/v2/cards?q=set.id:${val}`,
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
        },
      })
    ),
    RX.catchError(() => {
      return throwError(() => new Error("Could not fetch cards list from API"));
    }),
    RX.map((val) => val.response)
  );

  //?
  useEffect(() => {
    const cardSubscription = renderCards$.subscribe({
      next: (value) => setCards(value),
      complete: () => console.log("COMPLETE: cardSubscription"),
      error: (e) => console.log("ERROR: cardSubscription ", e),
    });

    //unsubbing here as useEffect isnt passing empty arr, [] - to avoid rerun of network request onClick
    if (cards) {
      cardSubscription.unsubscribe();
      console.log("UNSUBSCRIBED : cardSubscription");
    }
  });

  /*****************************************************************/

  /******************RENDER_CARDS_PAGELOAD_API**********************/

  //?
  const pageLoad$ = ajax({
    url: `https://api.pokemontcg.io/v2/cards?q=set.id:swsh12pt5gg`,
    method: "GET",
    headers: {
      "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
    },
  }).pipe(
    RX.catchError(() => {
      return throwError(
        () => new Error("Could not fetch cards API for pageLoad ")
      );
    }),
    RX.map((val) => val.response)
  );

  //?
  useEffect(() => {
    pageLoad$.subscribe({
      next: (value) => setCards(value),
      complete: () => console.log("COMPLETE: cardsPageLoad"),
      error: (e) => console.log("ERROR: cardsPageLoad ", e),
    });

    /*  if (cards) {
      pageLoadSubscription.unsubscribe();
      console.log("UNSUBSCRIBED : pageLoadSubscription");
    }*/
  }, []);

  /*****************************************************************/

  return (
    <>
      <div className="main-container">
        <nav className="navigation">
          <div id="pocket-collector-logo">
            <img src={logo} alt="Pocket Collector" className="brand-logo" />
          </div>
          <ul>
            {navigationList ? (
              navigationList.map((nav, index) => {
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
            ) : (
              <img src={loadSpinner} alt="loading" className="nav-load" />
            )}
          </ul>
          <footer>
            <img src={github} alt="Github" />
          </footer>
        </nav>
        <section className="results">
          {cards ? (
            cards.data.map((card, i) => {
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
          ) : (
            <img src={loadSpinner} alt="loading" className="card-load" />
          )}
        </section>
      </div>
    </>
  );
}

export default App;
