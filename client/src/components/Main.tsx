import React, {Component} from 'react';
import Navigation from "./common/Navigation";
import Content from "./Content";

class Main extends Component {
    render() {
        return (
            <>
                <Navigation/>
                <Content/>
            </>
        );
    }
}

export default Main