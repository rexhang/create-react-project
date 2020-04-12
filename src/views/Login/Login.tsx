import * as React from "react";

import './Login.scss';

export class Login extends React.Component<any, any>{
    componentDidMount(): void {
        console.log(this.props);
    }

    render(): React.ReactNode {
        return (
            <div className='App-Login'>
                Login
            </div>
        )
    }
}