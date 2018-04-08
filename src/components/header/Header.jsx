import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

const Header = props => (
  <div className="header">
    <input onChange={props.handleSearch} className="input-search" type="text" placeholder="Search" />
  </div>
);

Header.propTypes = propTypes;

export default Header;
