import React, {Component, FC} from 'react';
import MenuIcon from "./icons/MenuIcon";
import LogoutIcon from "./icons/LogoutIcon";
import {connect} from "react-redux";
import {logoutUserAction} from "../../actions/auth";
import classNames from "classnames";
import {setActiveTabAction, showCompanyModalAction} from "../../actions/common";
import {IState, ITabHeaderItemProps} from "../../types/main";
import {INavigationDispatchProps, INavigationProps} from "../../types/common";
import {adminRole} from "../../config";

const TabHeaderItem: FC<ITabHeaderItemProps> = ({label, onClick, isActive = false}: ITabHeaderItemProps) => {
    return (
        <li className="nav-item">
            <a href="#"
               className={classNames("nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 hover:border-transparent hover:bg-gray-100 focus:border-transparent", {
                   'active': isActive
               })}
               onClick={() => onClick()}
            >
                {label}
            </a>
        </li>
    )
}

class Navigation extends Component<INavigationProps & INavigationDispatchProps> {

    onLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault()
        this.props.logoutUserAction()
    }

    render() {
        return (
            <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
                <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6 relative">
                    <div className="flex-grow items-center" id="navbarSupportedContent">
                        <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0" id="tabs-tab" role="tablist">
                            <TabHeaderItem label={'Horario'} href={'#tabs-main'} isActive={this.props.activeTab === 'main'} onClick={() => this.props.setActiveTabAction('main')} />
                            {this.props.authUser && this.props.authUser.role === adminRole && <TabHeaderItem label={'Trabajadores'} href={'#tabs-users'} isActive={this.props.activeTab === 'users'} onClick={() => this.props.setActiveTabAction('users')} />}
                            {this.props.authUser && this.props.authUser.role === adminRole && <TabHeaderItem label={'Empresa'} href={'#'} isActive={false} onClick={() => this.props.showCompanyModalAction()} />}
                        </ul>
                    </div>

                    <div className="flex items-center absolute right-0 px-2.5 py-2">
                        <a className="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4" href="#" onClick={e => this.onLogout(e)}>
                            <LogoutIcon />
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default connect(
    (state: IState) => {
        return {
            isLogged: state.auth.isLogged,
            activeTab: state.common.activeTab,
            authUser: state.auth.authUser
        }
    },
    {logoutUserAction, setActiveTabAction, showCompanyModalAction}
)(Navigation);