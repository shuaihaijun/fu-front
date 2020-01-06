<template>
	<div class='su_upload'>
		<template v-for='(item, index) in images'>
			<div class="img_list_item">
				<div class='img_list'>
			    <span v-if="item.certificateSuffix != '.jpg' && item.certificateSuffix != '.png' && item.certificateSuffix != '.jpeg' && item.certificateSuffix != '.gif' && item.certificateSuffix != '.bmp'">
			      <img v-if="item.certificateSuffix == '.xlsx'" src="../../static/excel.jpg"/>
			      <img v-else-if="item.certificateSuffix == '.docx'" src="../../static/word.jpg"/>
			      <img v-else-if="item.certificateSuffix == '.pdf'" src="../../static/pdf.jpg"/>
			      <img v-else src="../../static/no.jpg"/>
			    </span>
					<img v-else :src="item.certificateUrl"/>
					<span class="img_del" v-if="showType == 'edit'">
						<i class="el-icon-delete" @click='del(item, index)'></i>
					</span>
					<span class="img_del" v-else @click="view(item, index)">
					  <i class="el-icon-search" style="margin-top:65px;"></i>
					</span>
				</div>
				<p class="img_title" :title="item.certificateName">{{item.certificateName}}</p>
			</div>
		</template>
		<div class='add_img' v-if="showType == 'edit'">
			<span class="add_img_ico">
				<i class="el-icon-plus"></i>
			</span>
			<input @change='add' type="file" ref="file">
		</div>
	</div>
</template>
<script>
	export default {
	  name: 'os-upload',
		props: {
			files: {
				default () {
					return []
				}
			},
			file: '',
			images: {
				default () {
					return []
				}
			},
			showType: {
				default: 'edit'
			}
		},
		data() {
      return {
        ext: ''
      }
		},
		computed: {
		},
		methods: {
      view(item, index) {
        let url = item.certificateUrl
        window.open(url)
      },
			del(item, index) {
				this.images.splice(index, 1)
				this.files.splice(index, 1)
				let _data = {
					images: this.images,
					files: this.files,
					item: item
				}
				this.$emit('del-change', _data)
			},
			add(index) {
				var addOnOff
				var reader = new window.FileReader()
				var file = this.$refs.file.files[0]
				if (file !== undefined) {
					if (file.size / 1024 / 1024 > 10) {
						this.$message.error('上传的图片不能大于10M')
						addOnOff = false
						return false
					}
					let filetypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'pdf', 'doc', 'docx', 'dwt', 'xlsx', 'xls']
					let idx = file.name.lastIndexOf('.')
					let ext = ''
          let isnext = false
          if (idx !== -1) {
            ext = file.name.substr(idx + 1).toUpperCase()
            ext = ext.toLowerCase()
            this.ext = ext
          }
          for (var i = 0; i < filetypes.length; i++) {
            if (filetypes[i] === ext) {
              isnext = true
              break
            }
          }
					if (isnext) {
						addOnOff = true
					} else {
						this.$message.error('不接受此文件类型!')
						addOnOff = false
					}
				}
				if (addOnOff) {
					reader.readAsDataURL(file)
					var me = this
					reader.onloadend = function() {
						var _data = {
              certificateSuffix: '.' + me.ext,
							certificateUrl: reader.result,
							certificateName: file.name
						}
						me.images.push(_data)
						me.files.push(file)
					}
					console.log(this.images)
					this.$emit('add-change', this.images, file)
				}
			}
		}
	}
</script>
<style>
	.su_upload {
		width: 100%;
	}
	.su_upload:after{
		content:"";
		clear:both;
		display:block;
	}
	.img_list_item{
		width: 148px;
		margin: 0 8px 8px 0;
		float: left;
	}
	.img_list_input{
		width: 100%;
		text-align: center;
		background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 1;
    outline: none;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
	}
	.su_upload .img_list {
		overflow: hidden;
		background-color: #fff;
		border: 1px solid #c0ccda;
		border-radius: 6px;
		box-sizing: border-box;
		width: 148px;
		height: 148px;
		display: inline-block;
		position: relative;
	}

	.su_upload .img_list img {
		width: 100%;
		height: 100%;
	}

	.add_img {
		background-color: #fbfdff;
		border: 1px dashed #c0ccda;
		border-radius: 6px;
		box-sizing: border-box;
		width: 148px;
		height: 148px;
		cursor: pointer;
		line-height: 146px;
		vertical-align: top;
		text-align: center;
		overflow: hidden;
		position: relative;
	}

	.add_img .add_img_ico {
		font-family: element-icons!important;
		font-size: 28px;
		color: #8c939d;
		font-style: normal;
		cursor: pointer;
		font-weight: 400;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
		display: inline-block;
	}

	.add_img input {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 2;
		opacity: 0;
	}
	.img_del {
    opacity: 0;
	}
	.img_list:hover .img_del {
		position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 9;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		display:block;
	}
	.el-icon-delete{
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -5px;
		margin-top:-5px;
		color: #fff;
		display: block;
	}
	.img_title{
	  text-align: center;
	  overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding: 0 10px;
	}
</style>
