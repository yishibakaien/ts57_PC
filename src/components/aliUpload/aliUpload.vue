<template>
	<div class="oss-file">
		<input type="file" :id="id" :multiple="multiple" @change="doUpload($event)" />
	</div>
</template>
<script>
	import uploadPicture from '@/common/js/uploadPicture';
	import { token } from '@/common/api/api';
	export default {
		props: {
			multiple: '',
			id: ''
		},
		data() {
			return {
				dir: '',
				region: 'oss-cn-shenzhen',
				url: {
					base64Url: [],
					ossUrl: []
				}
			};
		},
		methods: {
			uuidMethod() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},
			doUpload() {
				let _ = this;
				token().then((res) => {
					_.dir = res.data.data.dir;
					const files = document.getElementById(_.id);
					const fileLen = files.files;
					const client = new OSS.Wrapper({
						region: _.region,
						accessKeyId: res.data.data.accessKeyId,
						accessKeySecret: res.data.data.accessKeySecret,
						stsToken: res.data.data.securityToken,
						bucket: res.data.data.bucket
					});
					if (fileLen) {
						for (let i = 0; i < fileLen.length; i++) {
							let file = fileLen[i];
							//1
							uploadPicture(file).then((result) => {
								_.url.base64Url.push(result);
							});
							let storeAs = _.dir + 'web-' + _.uuidMethod().split('-').join('') + '.' + file.name.split('.')[file.name.split('.').length - 1];
							//2
							client.multipartUpload(storeAs, file, {
							}).then((results) => {
								_.url.ossUrl.push(storeAs);
								_.$emit('doUpload', _.url);
							}).catch((err) => {
								console.log(err);
							});
						}
					}
				}).catch();
			}
		}
	};
</script>
<style type="text/css">
	.oss-file {
		float: left;
	}

	.oss-file input {
		position: absolute;
		opacity: 0;
		filter: alpha(opacity=0);
	}
</style>
