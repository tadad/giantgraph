import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const hardData = require('./Renaissance.json'); // needs to be dynamically fetched from server

// eslint complains that it "prefers default." No idea what that means or why i should care
export const AppContext = React.createContext();

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: hardData,
      searchValue: 'asdf',
      sideIsOpen: false,
      selectedNode: null,
    };
  }

  setNode = (node) => {
    this.setState({ selectedNode: node });
  }

  // shouldn't need to say this but if you're disabling a lint rule you're doing something wrong
  // or if it is an actual decision to go against the line (not just trying to get shit to compile)
  // then you need to comment explaining why it's a valid use case
  setSearchValue = (newValue) => {
    this.props.history.push('/see/' + newValue); //eslint-disable-line
  }

  openSide = () => {
    this.setState({ sideIsOpen: true });
  }

  closeSide = () => {
    this.setState({ sideIsOpen: false });
  }

  render() {
    const { children } = this.props;
    const {
      data, searchValue, sideIsOpen, selectedNode,
    } = this.state;
    return (
      <AppContext.Provider value={{
        data,
        sideIsOpen,
        selectedNode,
        searchValue,
        setNode: this.setNode,
        setSearchValue: this.setSearchValue,
        openSide: this.openSide,
        closeSide: this.closeSide,
      }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default withRouter(AppProvider);
