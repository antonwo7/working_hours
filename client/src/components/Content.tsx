import React, {Component, ComponentType, FC} from 'react';
import classNames from "classnames";
import {connect} from "react-redux";
import PageLoading from "./common/PageLoading";
import MainFormPage from "./pages/MainFormPage";
import {IState, ITabContentItemProps, TContentProps} from "../types/main";

const TabContentItem: FC<ITabContentItemProps> = (props: ITabContentItemProps) => {
    const {id, isActive = false} = props
    const TabComponent: typeof MainFormPage = props.TabComponent

    return (
        <div
            className={classNames('tab-pane fade', { 'active': isActive, 'show': isActive })}
            id={id}
            aria-labelledby="tabs-profile-tab"
        >
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
                {this.props.loading ? <PageLoading /> : (
                    <>
                        <div className="tab-content bg-gray-200 h-full w-full inline-table" id="tabs-tabContent">
                            <TabContentItem id={'tabs-main'} TabComponent={MainFormPage} isActive={this.props.activeTab === 'main'}/>
                        </div>
                    </>
                )}
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