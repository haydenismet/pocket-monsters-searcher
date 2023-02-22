import { useEffect } from "react";
import { ajax } from "rxjs/ajax";
import { throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import logo from "../assets/img/Logo.svg";
import github from "../assets/img/github-mark-white.svg";
import loadSpinner from "../assets/img/load-cards-spinner.svg";
import {
  pokemonSetsAjax,
  pokemonSetsResponse,
  NavigationProps,
} from "../components/interfaces/custom-interfaces";

function Navigation(props: NavigationProps) {
  const { navigationList, setNavigationList, navSelector } = props;
  //console.log("navigationProps", props);

  const getAllSets$ = ajax({
    url: "https://api.pokemontcg.io/v2/sets",
    method: "GET",
    headers: {
      "X-Api-Key": `${process.env.REACT_APP_API_KEY}`,
    },
  }).pipe(
    catchError(() => {
      return throwError(
        () => new Error("Could not fetch navigation list from API")
      );
    }),

    map((val: pokemonSetsAjax) => {
      //console.log("pokemeonSetsAjax", val);
      return val.response.data.filter(
        (item: pokemonSetsResponse) =>
          item.series === "Sword & Shield" && item.name.includes("Gallery")
      );
    }),
    //tap((val) => console.log("post pokemonSetsResponse", val)),
    map((val: pokemonSetsResponse[]) => {
      val.reverse();
      return val.map(({ name, id }) => ({ name, id }));
    })
  );

  useEffect(() => {
    getAllSets$.subscribe({
      next: (value) => setNavigationList(value),
      complete: () => console.log("COMPLETE: navSubscription"),
      error: (e) => {
        console.log("ERROR: navSubscription", e);
      },
    });
  }, []);

  //console.log("NAVIGATIONLIST", navigationList);

  return (
    <nav className="navigation">
      <div id="pocket-collector-logo">
        <img src={logo} alt="Pocket Collector" className="brand-logo" />
      </div>
      <ul>
        {navigationList ? (
          navigationList.map(
            (nav: { name: string; id: string }, index: number) => {
              return (
                <li
                  key={index}
                  id={nav.id}
                  className="generated-nav"
                  ref={(element) => {
                    if (element !== null) navSelector.current[index] = element;
                  }}
                >
                  {nav.name}
                </li>
              );
            }
          )
        ) : (
          <img src={loadSpinner} alt="loading" className="nav-load" />
        )}
      </ul>
      <footer>
        <img src={github} alt="Github" />
      </footer>
    </nav>
  );
}

export default Navigation;
