import React, { Component } from 'react'
import PageLoadingIcon from "./icons/PageLoadingIcon"
import classNames from "classnames"
import { IPageLoadingProps } from "../../types/common"

class SectionLoading extends Component<IPageLoadingProps> {
    render() {
        return (
            <div id="loading-screen" className={classNames('w-full h-full absolute block top-0 left-0 bg-white z-50', { 'bg-opacity-50': this.props.opacity })}>
              <span className="text-green-500 opacity-75 my-0 mx-auto block relative w-full h-full flex justify-center items-center">
                <PageLoadingIcon />
              </span>
            </div>
        )
    }
}

export default SectionLoading