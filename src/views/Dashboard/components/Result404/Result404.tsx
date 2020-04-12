import * as React from "react";

import './Result404.scss';

import { Result, Button } from 'antd';

export class Result404 extends React.Component<any, any>{
    render(): React.ReactNode {
        return (
            <div className='App-Dashboard-Result404'>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary">Back Home</Button>}
                />
            </div>
        )
    }
}