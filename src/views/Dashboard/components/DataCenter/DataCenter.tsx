import * as React from "react";

import './DataCenter.scss';

import { Statistic, Row, Col, Button } from 'antd';

export class DataCenter extends React.Component<any, any>{
    render(): React.ReactNode {
        return (
            <div className='App-Dashboard-DataCenter'>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Active Users" value={112893} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                        <Button style={{ marginTop: 16 }} type="primary">
                            Recharge
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}