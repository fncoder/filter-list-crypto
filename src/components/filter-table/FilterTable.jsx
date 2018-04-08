import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentData: PropTypes.array.isRequired,
  percentageCategory: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
  filterCategory: PropTypes.func.isRequired,
};

const FilterTable = props => (
  <div className="filter-table">
    <div className="filter-table-row">
      <div className="filter-table-col">
        <li onClick={props.filterCategory} className="category category-index">#</li>
        {props.currentData ? props.currentData.map((value, index) => <li key={index} className="filter-item">{value.rank}</li>) : false}
      </div>
      <div className="filter-table-col">
        <li onClick={props.filterCategory} className="category category-name">Name</li>
        {props.currentData ? props.currentData.map((value, index) => <li key={index} className="filter-item">{value.name}</li>) : false}
      </div>
      <div className="filter-table-col">
        <li onClick={props.filterCategory} className="category category-marketcap">Market Cap</li>
        {props.currentData ? props.currentData.map((value, index) => <li key={index} className="filter-item">${props.format(value.market_cap_usd)}</li>) : false}
      </div>
      <div className="filter-table-col">
        <li onClick={props.filterCategory} className="category category-price">Price</li>
        {props.currentData ? props.currentData.map((value, index) => <li key={index} className="filter-item">${props.format(value.price_usd, 'price')}</li>) : false}
      </div>
      <div className="filter-table-col">
        <li onClick={props.filterCategory} className="category category-volume">Volume (24h)</li>
        {props.currentData ? props.currentData.map((value, index) => <li key={index} className="filter-item">${props.format(value['24h_volume_usd'])}</li>) : false}
      </div>
      <div className="filter-table-col">
        <li onClick={props.filterCategory} className="category category-supply">Circulating Supply</li>
        {props.currentData ? props.currentData.map((value, index) => <li key={index} className="filter-item">{`${props.format(value.available_supply)} ${value.symbol}`}</li>) : false}
      </div>
      <div className="filter-table-col">
        <li onClick={props.filterCategory} className="category category-change">Change (24h)</li>
        {props.currentData ? props.percentageCategory(props.currentData) : false}
      </div>
    </div>
    <p className="text-info">{props.currentData && props.currentData.length > 0 ? '' : 'Not found' }</p>
  </div>
);

FilterTable.propTypes = propTypes;

export default FilterTable;
