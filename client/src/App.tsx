import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from './reducers/index';
import Login from "./components/common/Login";
import Main from "./components/Main";
import {checkLoggedUserAction, setLoadingAction, hideLoadingAction} from "./actions/auth";
import PageLoading from "./components/common/PageLoading";
import {IAppProps, IState} from "./types/main";
import {setUsersAction} from "./actions/users";

store.dispatch(setLoadingAction())
store.dispatch(checkLoggedUserAction(hideLoadingAction, setUsersAction))

class App extends Component<IAppProps> {

  render() {
    return (
        <>
          {this.props.loading && <PageLoading />}
          {this.props.isLogged ? <Main /> : <Login />}
        </>
    )
  }
}

export default connect(
    (state: IState) => {
      return {
        authUser: null,
        isLogged: state.auth.isLogged,
        loading: state.auth.loading
      }
    },
    {}
)(App);