import { token } from './api.js';
   import OSS from 'ali-oss';
   import co from 'co';

export function upPicOSS(e) {
	let accessKeyId;
	let accessKeySecret;
	let bucket;
	let stsToken;
	token().then((res) => {
		accessKeyId = res.data.data.accessKeyId;
		accessKeySecret = res.data.data.accessKeySecret;
		bucket = res.data.data.bucket;
		stsToken = res.data.data.securityToken;
		return new OSS.Wrapper({
			region: 'oss-cn-shenzhen',
			accessKeyId: accessKeyId,
			accessKeySecret: accessKeySecret,
			stsToken: stsToken,
			bucket: bucket
		});
	}).catch();
	console.log(client);
	//	var client = new OSS.Wrapper({
	//		region: 'oss-cn-shenzhen',
	//		accessKeyId: accessKeyId,
	//		accessKeySecret: accessKeySecret,
	//		stsToken: stsToken,
	//		bucket: bucket
	//	});
	//	let file = e.target.files[0];
	//	let storeAs = 'upload-file';
	//	console.log(file.name + ' => ' + storeAs);
	//	client.multipartUpload(storeAs, file).then(function(result) {
	//		console.log(result);
	//	}).catch(function(err) {
	//		console.log(err);
	//	});
}
