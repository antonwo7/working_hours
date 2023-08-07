import React, {Component, ComponentType, FC} from 'react';
import classNames from "classnames";
import {connect} from "react-redux";
import PageLoading from "./common/PageLoading";
import MainPage from "./pages/MainPage";
import {IState, ITabContentItemProps, TContentProps} from "../types/main";
import UsersPage from "./pages/UsersPage";

const TabContentItem: FC<ITabContentItemProps> = (props: ITabContentItemProps) => {
    const {id, isActive = false} = props
    const TabComponent: typeof MainPage = props.TabComponent

    return (
        <div className={classNames("tab-pane", { 'hidden': !isActive })} id={id}>
            <TabComponent />
        </div>
    )
}

class Content extends Component<TContentProps> {

    constructor(props: TContentProps) {
        super(props)
    }

    render() {
        return (
            <>
                <div className="bg-gray-200 h-full w-full inline-table hi">
                    <TabContentItem id={'tabs-main'} TabComponent={MainPage} isActive={this.props.activeTab === 'main'}/>
                    <TabContentItem id={'tabs-users'} TabComponent={UsersPage} isActive={this.props.activeTab === 'users'}/>
                </div>
            </>
        );
    }
}

export default connect(
    (state: IState) => {
        return {
            loading: state.common.loading,
            activeTab: state.common.activeTab
        }
    },
    {}
)(Content);