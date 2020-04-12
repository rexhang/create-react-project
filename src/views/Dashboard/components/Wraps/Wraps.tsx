import * as React from "react";

import './Wraps.scss';

export class Wraps extends React.Component<any, any>{
	render(): React.ReactNode {
        return (
            <div className="Wraps">
                {this.props.children}
            </div>
        )
    }
}