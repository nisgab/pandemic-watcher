import * as ko from 'knockout';
import { PlagueList } from './plagueLists';


class ViewModel {
  private items: any;
  private plagesLists = ko.observableArray([]);
  private activePlague;
  private amountOfPlagues;

  constructor(params) {
    this.items = params.items;
    this.activePlague = params.activePlague;

    new PlagueList();
  }

  getPlagues() {
    //@ts-ignore
    let plagues = Object.values(this.items()).reverse();
    this.amountOfPlagues = plagues.length - 1;
    return plagues;
  }
}

export function plaguesContainer() {
  ko.components.register('ko-plague-container', {
    template: require('./plaguesContainer.html'),
    viewModel: {
      createViewModel: (params, componentInfo) => new ViewModel(params)
    }
  });
}
