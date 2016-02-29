import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { link } from 'gatsby-helpers';
import { rhythm, fontSizeToMS } from 'utils/typography'

import '../css/styles.css';

export default class extends React.Component {
  render() {
    let header;
    header = (
      <nav>
        <span className="link-group">
          <Link to={link('/')}>Work</Link>
          <Link to={link('/')}>About</Link>
        </span>

        <Link to={link('/')}>Twnsnd Co</Link>

        <span className="link-group">
          <Link to={link('/')}>Journal</Link>
          <Link to={link('/')}>Contact</Link>
        </span>
      </nav>
    );
    return (
      <main className='app-inner'>
        <div className='site-content'>
          {header}
          <RouteHandler {...this.props}/>
        </div>
      </main>
    );
  }
}
