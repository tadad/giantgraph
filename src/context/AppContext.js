import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const hardData = require('../Renaissance.json'); // needs to be dynamically fetched from server

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

  setSearchValue = (newValue) => {
    const { history } = this.props;
    history.push(`/see/${newValue}`);
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
  // object is not allowed as a proptype for eslint...
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default withRouter(AppProvider);
