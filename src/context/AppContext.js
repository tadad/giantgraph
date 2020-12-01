import React from 'react';
// import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { nodes: [], links: [] },
      searchValue: 'renaissance',
      sideIsOpen: false,
      selectedNode: null,
    };

    // this.setState = this.setState.bind(this);
  }

  setNode = (node) => {
    this.setState({ selectedNode: node });
  }

  setSearchValue = (e, searchValue) => {
    this.setState({ searchValue }, () => {
      // console.log(`setting search value: ${this.state.searchValue}`); //eslint-disable-line
      const { history } = this.props;
      history.push(`/see/${searchValue}`);
      e.preventDefault();
      // check if you need to do a preventDefault() here to stop a hard page reload
    });
    this.getData(searchValue);
  }

  getData = async (searchValue) => {
    // let test = {};
    if (searchValue) {
      // const search = `/api/see/${searchValue}`;
      // const req = fetch('https://run.mocky.io/v3/5de8bf00-be12-4456-9643-56b95ce1cf68');
      // const res = await req;
      // console.log(res);

      const res = {
        data: {
          nodes: [
            { id: 1, name: 'test', description: 'test' },
            { id: 2, name: 'test', description: 'test' },
          ],
          links: [
            { source: 1, target: 2 },
          ],
        },
      };
      this.setState({ data: res.data });

      // OLD CODE
      // axios.get(search);
      // console.log(req instanceof Promise);
      // console.log(res);
      // .then((res) => {
      //   test = res.data;
      //   console.log('line 45');
      //   console.log(test);
      // });
      // .then(
      //   this.setState({ data: test }, () => {
      //     console.log('line 50');
      //     console.log(this.state.data);  //eslint-disable-line
      //   }),
      // );
      // .then((res) => console.log(res.data));
    }
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
