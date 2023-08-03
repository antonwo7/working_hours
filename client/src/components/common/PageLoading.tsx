import React, { Component } from 'react'
import PageLoadingIcon from "./icons/PageLoadingIcon"
import classNames from "classnames"
import { IPageLoadingProps } from "../../types/common"

class PageLoading extends Component<IPageLoadingProps> {
    render() {
        return (
            <div id="loading-screen"
                 className={classNames('w-full h-full fixed block top-0 left-0 bg-white z-50', {
                     'bg-opacity-70': this.props.opacity
                 })}
            >
                  <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                    <PageLoadingIcon />
                  </span>
            </div>
        )
    }
}

export default PageLoading