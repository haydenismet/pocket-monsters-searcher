import { DOMElement, useEffect } from "react";
import { ajax } from "rxjs/ajax";
import { fromEvent, throwError } from "rxjs";
import { map, switchMap, tap, catchError } from "rxjs/operators";
import loadSpinner from "../assets/img/load-cards-spinner.svg";
import add from "../assets/img/Add.svg";
import want from "../assets/img/Want.svg";
import { Card, ResultsProps } from "../components/interfaces/custom-interfaces";

function Results(props: ResultsProps) {
  const { navSelector, setCards, cards } = props;
  //console.log("results props", props);
  const renderCards$ = fromEvent(navSelector.current, "click").pipe(
    //tap((val) => console.log(val.target.id)),
    catchError(() => {
      return throwError(() => new Error("Could not fetch selector from DOM"));
    }),

    // TODO:: left as any
    map((val: any) => {
      //console.log("results val passed", val, typeof val);

      return val.target;
    }),
    map((val: Element) => {
      return val.id;
    }),
    switchMap((val: string) =>
      ajax({
        url: `https://api.pokemontcg.io/v2/cards?q=set.id:${val}`,
        method: "GET",
        headers: {
          "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
        },
      })
    ),
    catchError(() => {
      return throwError(() => new Error("Could not fetch cards list from API"));
    }),
    map((val) => val.response)
    //tap((val) => console.log("final val typeof", typeof val, "val", val))
  );

  useEffect(() => {
    const cardSubscription = renderCards$.subscribe({
      //TODO:: any used here
      next: (value: any) => {
        setCards(value);
      },
      complete: () => console.log("COMPLETE: cardSubscription"),
      error: (e) => console.log("ERROR: cardSubscription ", e),
    });

    //unsubbing here as useEffect isnt passing empty arr, [] - to avoid rerun of network request onClick
    if (cards) {
      cardSubscription.unsubscribe();
      console.log("UNSUBSCRIBED : cardSubscription");
    }
  });
  return (
    <section className="results">
      {cards ? (
        cards.data.map((card: Card, i: number) => {
          return (
            <>
              <div className="placeholder" key={i} data-index={i}>
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
  );
}

export default Results;
