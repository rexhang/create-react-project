import * as React from "react";

import { Alert } from "antd";

export class Project extends React.Component<any, any>{
    render(): React.ReactNode {
        return (
            <div>
                <Alert message="project is create-react-project" type="info" showIcon />
            </div>
        );
    }
}