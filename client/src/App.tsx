import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from './reducers/index';
import Login from "./components/common/Login";
import Main from "./components/Main";
import {checkLoggedUserAction, setLoadingAction, hideLoadingAction} from "./actions/auth";
import PageLoading from "./components/common/PageLoading";
import {IAppProps, IState} from "./types/main";
import {setUsersAction} from "./actions/users";
import {setDaysAction} from "./actions/days";
import {IUser} from "./types/users";
import {IDay} from "./types/days";
import {ICompany} from "./types/companies";
import {setCompaniesAction} from "./actions/companies";

store.dispatch(setLoadingAction())
store.dispatch(checkLoggedUserAction(hideLoadingAction, (users: Array<IUser>, days: Array<IDay>, companies: Array<ICompany>) => {
    store.dispatch(setUsersAction(users))
    store.dispatch(setDaysAction(days))
    store.dispatch(setCompaniesAction(companies))
}))

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