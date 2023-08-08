import React, {Component} from 'react';
import {connect} from "react-redux";
import {IState, TPageProps} from "../../types/main";
import Days from "../sections/Days";

class MainPage extends Component<TPageProps> {
    render() {
        return (
            <section className="h-full gradient-form">
                <div className="container-fluid px-10 h-full mx-auto mb-1 mt-10 pb-0">
                    <div className="flex justify-center items-center flex-wrap h-full w-full g-6 text-gray-800 mx-auto">
                        <div className="block bg-white shadow-lg rounded-lg mb-4 w-full">
                            <div className="flex p-4 rounded-b dark:border-gray-600 flex-col justify-center w-full">
                                <Days />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(
    (state: IState) => {
        return {
            loading: state.common.loading
        }
    },    {}
)(MainPage);