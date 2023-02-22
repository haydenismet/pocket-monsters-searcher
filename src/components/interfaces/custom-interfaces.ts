export interface Card {
  id: string;
  images: { large: string; small: string };
  name: string;
  number: string;
  set: { name: string; series: string; releaseDate: string };
}

export interface CardItems extends Card {
  data: Card[];
}

export interface NavigationItems {
  name: string;
  id: string;
}

export interface pokemonSetsAjax {
  //TODO : any usage
  response: any;
}

export interface pokemonSetsResponse {
  id: string;
  images?: {
    logo?: string;
    symbol?: string;
  };
  legalities?: { unlimited?: string; standard?: string; expanded?: string };
  name: string;
  printedTotal?: string;
  ptcgoCode?: string;
  releaseDate: string;
  series: string;
  total?: number;
  updatedAt?: string;
}

// adding void below causes it to pass regardless of what type is passed in, so its kind of cheating / like using any.
export interface NavigationProps {
  navSelector: { current: HTMLLIElement[] };
  navigationList: { name: string; id: string }[] | null;
  setNavigationList(
    val: { name: string; id: string }[]
  ): NavigationItems | void;
}
//repeated yourself here from NavigationProps and other interfaces - could be refactored.
export interface ResultsProps {
  cards: CardItems | null;
  navSelector: { current: HTMLLIElement[] };
  setCards(val: CardItems | null): CardItems[] | void;
}
