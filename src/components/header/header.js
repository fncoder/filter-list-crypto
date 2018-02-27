const React = require('react');

const Header = (props)=>{
  return (
    <div className="header">
      <input onChange={props.handleSearch} className="input-search" type="text" placeholder="Search"/>
      <div className="languages">
        <button onClick={props.toggleClass} type="button" className="btn-dropdown">English</button>
        <ul className={`dropdown ${props.statusLang ? 'active' : 'unactive'}`}>
          <li className="dropdown-item"><a className="dropdown-item__link" href="/">English</a></li>
          <li className="dropdown-item"><a className="dropdown-item__link" href="/pl">Polski</a></li>
          <li className="dropdown-item"><a className="dropdown-item__link" href="/de">Deutsch</a></li>
        </ul>
      </div>
    </div>
  )
}

module.exports = Header;
