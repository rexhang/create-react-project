import * as React from "react";

import { Button } from "antd";

import { CloudUploadOutlined } from '@ant-design/icons';

interface FileUploadInterface {
	id: number;
}

interface Props {
	title: string;
	onSuccess(file: object): void;
	onError(file: object): void;
}

interface States {
	uploading: boolean;
}

export class FileUpload extends React.Component<Props, States> implements FileUploadInterface{
	id: 5201314;
	state = {
		uploading: false
	};
	render() {
		const { title = '上传文件', onSuccess, onError } = this.props;
		return (
			<Button onClick={()=>{
				onSuccess({name: 0});
				onError({name: 500});
			}} icon={<CloudUploadOutlined />}>{title}</Button>
		)
	}
}