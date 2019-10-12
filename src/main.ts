import * as ko from 'knockout';
// import { credits } from './components_old/credits';
import { plaguesContainer } from './components/plaguesContainer';
// import { searchBox } from './components_old/searchBox';
const citiesDB = require('./cities.json');
const plagues = require('./plagues.json');

export default class ViewModel {
  private plaguesContainer: void;

  private plagues = ko.observableArray(plagues);
  private unsedInfectionCards = ko.observableArray([]);
  private infectionCards = ko.observable();
  private selectedCity = ko.observable({
    yellow: undefined,
    red: undefined,
    blue: undefined,
    black: undefined,
  });
  private currentPlague = ko.observable(0);
  private amountOfPlagues = 4;

  constructor() {
    this.unsedInfectionCards(citiesDB.map(c => {
      return {
        ...c,
        active: 0,
        infection: []
      }
    }));

    let infected = {};
    for (let i = 0; i < this.amountOfPlagues; i++) {
      infected[i] = ko.observableArray([]);
    }
    this.infectionCards(infected);

    this.plaguesContainer = plaguesContainer();
  }

  getCitiesByColor(color) {
    let list = this.unsedInfectionCards().filter(c => c.color === color.name).sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      else if (a.name < b.name) {
        return -1
      }
      else {
        return 0;
      }
    });
    return list;
  }

  addCity(data, x, y, z) {
    let sc = this.selectedCity()[data.name];
    if (sc) {

      let newInfectionCards = { ...this.infectionCards() };
      let newList = [...newInfectionCards[this.currentPlague()]()];
      newList.push(sc);
      newInfectionCards[this.currentPlague()](newList);
      this.infectionCards(newInfectionCards);

      let newSelectedCity = { ...this.selectedCity() };
      newSelectedCity[data.name] = undefined;
      this.selectedCity(newSelectedCity);
    }
  }

  increasePlagueCounter(data) {
    if (data){
      if (this.currentPlague() < this.amountOfPlagues){
        this.currentPlague(this.currentPlague() + 1);
      }
    }
  }
}

ko.applyBindings(new ViewModel());
