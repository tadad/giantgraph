import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'renaissance',
      sideIsOpen: false,
      selectedNode: null,
    };
  }

  setNode = (node) => {
    this.setState({ selectedNode: node });
  }

  setSearchValue = (searchValue) => {
    this.setState({ searchValue }, () => {
      console.log(`setting search value: ${this.state.searchValue}`); //eslint-disable-line
      const { history } = this.props;
      history.push(`/see/${searchValue}`);
      // check if you need to do a preventDefault() here to stop a hard page reload
    });
  }

  openSide = () => {
    this.setState({ sideIsOpen: true });
  }

  closeSide = () => {
    this.setState({ sideIsOpen: false });
  }

  render() {
    const { children } = this.props;
    const { searchValue, sideIsOpen, selectedNode } = this.state;

    return (
      <AppContext.Provider value={{
        searchValue,
        sideIsOpen,
        selectedNode,
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
