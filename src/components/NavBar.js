import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './NavBar.css';

export class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const { value } = this.state;

    return (
      <AppContext.Consumer>
        { (context) => (
          <form onSubmit={(e) => context.setSearchValue(e, value)}>
            {console.log(context)}
            <input type="search" onChange={this.onChange} placeholder="Search..." />
          </form>
        )}
      </AppContext.Consumer>
    );
  }
}

export default withRouter(NavBar);
