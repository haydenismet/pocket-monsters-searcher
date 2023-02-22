import { useEffect, useState, useRef } from "react";
import { ajax } from "rxjs/ajax";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import Navigation from "./components/Navigation";
import Results from "./components/Results";
import {
  CardItems,
  NavigationItems,
} from "./components/interfaces/custom-interfaces";
import "./App.css";

function App() {
  const [navigationList, setNavigationList] = useState<
    NavigationItems[] | null
  >(null);

  const navSelector = useRef<HTMLLIElement[]>([]);

  const [cards, setCards] = useState<CardItems | null>(null);

  const pageLoad$ = ajax({
    url: `https://api.pokemontcg.io/v2/cards?q=set.id:swsh12pt5gg`,
    method: "GET",
    headers: {
      "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
    },
  }).pipe(
    catchError(() => {
      return throwError(
        () => new Error("Could not fetch cards API for pageLoad ")
      );
    }),
    map((val) => val.response)
  );

  useEffect(() => {
    pageLoad$.subscribe({
      //TODO:: any used here
      next: (value: any): void => setCards(value),
      complete: (): void => console.log("COMPLETE: cardsPageLoad"),
      error: (e): void => console.log("ERROR: cardsPageLoad ", e),
    });
  }, []);

  /*****************************************************************/

  return (
    <>
      <div className="main-container">
        <Navigation
          navigationList={navigationList}
          setNavigationList={setNavigationList}
          navSelector={navSelector}
        />
        <Results navSelector={navSelector} setCards={setCards} cards={cards} />
      </div>
    </>
  );
}

export default App;
