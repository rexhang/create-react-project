import * as React from "react";

import {TopPanel} from "./components/TopPanel";

import {Footer} from "./components/Footer";


import './Body.scss';

export class Body extends React.Component<any, any>{
    render(): React.ReactNode {
        return (
            <div className={'App-Body'}>
                <TopPanel {...this.props} />
                <div className="App-Content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}