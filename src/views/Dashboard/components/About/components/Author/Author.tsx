import * as React from "react";

import { Alert } from 'antd';

export class Author extends React.Component<any, any>{
    render(): React.ReactNode {
        return (
            <div>
                <Alert message="author is rexhang" type="info" showIcon />
            </div>
        );
    }
}