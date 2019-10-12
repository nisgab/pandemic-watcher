import * as ko from 'knockout';

class ViewModel {
  private items: any;  
  private isActivePlague = ko.observable();
  private activePlague;
  private listIndex;

  constructor(params) {        
    this.items = params.items;
    // this.isActivePlague(params.activePlague() === params.index());

    // console.log(this.isActivePlague());
    this.activePlague = params.activePlague;
    this.listIndex = params.index();
  }

  getColor(item) {
    return {
      red: item.color === 'red',
      yellow: item.color === 'yellow',
      blue: item.color === 'blue',
      black: item.color === 'black'
    };
  }
}

export function PlagueList() {
  ko.components.register('ko-plague-list', {
    template: require('./plagueLists.html'),
    viewModel: {
      createViewModel: (params, componentInfo) => new ViewModel(params)
    }
  });
}
