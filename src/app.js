const React = require('react');
const ReactDOM = require('react-dom');
const GlobalStyle = require('./scss/global.scss');
const RenderHTML = require('./index.html');
const Header = require('./components/header/Header.jsx');
const FilterTable = require('./components/filter-table/FilterTable.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      currentData: undefined,
      toggleLang: false,
    };

    this.toggles = {
      marketcap: false,
      price: false,
      volume: false,
      change: false,
      supply: false,
      id: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.filterCategory = this.filterCategory.bind(this);
    this.percentageCategory = this.percentageCategory.bind(this);
    this.removeSpaceNumber = this.removeSpaceNumber.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  }

  componentWillMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=100')
      .then(res => res.json())
      .then((res) => {
        this.setState({
          data: res,
          currentData: res,
        });
      });
  }

  handleSearch(e) {
    const regex = new RegExp(`^${e.target.value}`, 'i');
    const filtered = this.state.data.filter(value => regex.test(value.name));

    this.setState({
      currentData: filtered,
    });
  }

  filterCategory(e) {
    const lastClass = e.target.classList.length - 1;
    const current = [...this.state.currentData];

    if (e.target.classList[lastClass] === 'category-index') {
      const toLargest = current.sort((a, b) => a.rank - b.rank);

      if (!this.toggles.id) {
        this.setState({
          currentData: toLargest,
        });
      } else {
        this.setState({
          currentData: toLargest.reverse(),
        });
      }
      this.toggles.id = !this.toggles.id;
    } else if (e.target.classList[lastClass] === 'category-name') {
      const toLargest = current.sort((a, b) => a.name.localeCompare(b.name));

      if (!this.toggles.name) {
        this.setState({
          currentData: toLargest,
        });
      } else {
        this.setState({
          currentData: toLargest.reverse(),
        });
      }
      this.toggles.name = !this.toggles.name;
    } else if (e.target.classList[lastClass] === 'category-marketcap') {
      const toLargest = current.sort((a, b) => a.market_cap_usd - b.market_cap_usd);

      if (!this.toggles.marketcap) {
        this.setState({
          currentData: toLargest,
        });
      } else {
        this.setState({
          currentData: toLargest.reverse(),
        });
      }
      this.toggles.marketcap = !this.toggles.marketcap;
    } else if (e.target.classList[lastClass] === 'category-price') {
      const toLargest = current.sort((a, b) => a.price_usd - b.price_usd);

      if (!this.toggles.price) {
        this.setState({
          currentData: toLargest,
        });
      } else {
        this.setState({
          currentData: toLargest.reverse(),
        });
      }
      this.toggles.price = !this.toggles.price;
    } else if (e.target.classList[lastClass] === 'category-volume') {
      const toLargest = current.sort((a, b) => a['24h_volume_usd'] - b['24h_volume_usd']);

      if (!this.toggles.volume) {
        this.setState({
          currentData: toLargest,
        });
      } else {
        this.setState({
          currentData: toLargest.reverse(),
        });
      }
      this.toggles.volume = !this.toggles.volume;
    } else if (e.target.classList[lastClass] === 'category-supply') {
      const toLargest = current.sort((a, b) => a.available_supply - b.available_supply);

      if (!this.toggles.supply) {
        this.setState({
          currentData: toLargest,
        });
      } else {
        this.setState({
          currentData: toLargest.reverse(),
        });
      }
      this.toggles.supply = !this.toggles.supply;
    } else if (e.target.classList[lastClass] === 'category-change') {
      const toLargest = current.sort((a, b) => a.percent_change_24h - b.percent_change_24h);

      if (!this.toggles.change) {
        this.setState({
          currentData: toLargest,
        });
      } else {
        this.setState({
          currentData: toLargest.reverse(),
        });
      }
      this.toggles.change = !this.toggles.change;
    }
  }

  percentageCategory(currentData) {
    let classNegative;
    return currentData.map((value, index) => {
      if (value.percent_change_24h.indexOf('-') + 1) {
        classNegative = 'negative';
      } else {
        classNegative = 'positive';
      }
      return <li key={index} className={`filter-item ${classNegative}`}>{value.percent_change_24h}%</li>;
    });
  }

  removeSpaceNumber(number, category) {
    if (category === 'price') {
      if (number.charAt(0) === '0') {
        const toNumber = parseFloat(number).toFixed(6);
        return toNumber.replace('.', ',');
      }

      const toNumber = parseFloat(number).toFixed(2);
      return toNumber.replace('.', ',');
    }
    return parseFloat(number).toLocaleString();
  }

  toggleClass() {
    this.setState({
      toggleLang: !this.state.toggleLang,
    });
  }

  render() {
    return (
      <div className="app">
        <div className="wrapper app--wrapper">
          <Header
            statusLang={this.state.toggleLang}
            toggleClass={this.toggleClass}
            handleSearch={this.handleSearch}
          />
          <FilterTable
            format={this.removeSpaceNumber}
            percentageCategory={this.percentageCategory}
            filterCategory={this.filterCategory}
            currentData={this.state.currentData}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
