<template lang="html">
	<div class="imgSearch-content">
    <div class="imgSearch-result">
      <div class="imgSearch-image-box">
        <img :src="Pic.encoded" width="150" height="150" ref="uploadImg">
        <span class="imgSearch-image-box-tip" v-if="Pic.canCropper" @click="handleChoosePic">手动框图</span>
      </div>
      <div class="imgSearch-image-box-text">
        <!-- <p>对该图片的最佳猜测：{{firstProductNo}}</p> -->
        <p>对结果不满意？重新框图试试</p>
        <p>白色的花型更能被查找到哦！所以请尽量添加白色无干扰的花型样板。</p>
      </div>
    </div>
		<ts-title-block :bodyStyle="{'font-size':'20px'}">
			<i class="icon-huaxin"></i>&nbsp;相似花型
		</ts-title-block>
		<!-- 图片列表 -->
		<div class="">
			<ts-grid :data="search.list" class="imgSearch-data">
		    <ts-grid-item class="imgSearch-data-item" v-for="product in search.list" :key="product" @click="handleViewProduct(product.id)">
						<div class="imgSearch-image-box-img">
						<ts-image
			       width="170"
			       height="170"
			       :canView="false"
			       disabledHover
			       :src="product.defaultPicUrl">
			       </ts-image>
						 <div class="imgSearch-image-box-menu">
							 <p @click.stop="handleGotoDress(product)"><i class="icon-shiyihui"></i>&nbsp;试衣</p>
  						 <p @click.stop="handleChoosePic(product.defaultPicUrl)"><i class="icon-sousuo"></i>&nbsp;再找</p>
						 </div>
						 <img src="/static/images/tuijian.jpg" v-if="product.isBest===1"  class="imgSearch-image-box-watermask" alt="">
						 </div>
		       <p>{{product.companyName}}</p>
		       <template slot="footer">
             <span>{{product.productNo}}</span>
		         <span v-if="!Type.edit">{{product.publishDate}}</span>
						 <ts-tag class="imgSearch-tag" v-else>
						 	<a>编辑</a>
						 </ts-tag>
		       </template>
		     </ts-grid-item>
		  </ts-grid>
      <br/>
			<div class="imgSearch-tip imgSearch-wrapper">
        <p v-if="Pic.canCropper"><ts-button type="plain" @click="handleLoadMore">查看更多花型</ts-button></p>
				没找到合适的？赶紧
        <router-link tag="a" to="/releasePurchasePage" v-if="userInfo.userType===2">
          <a>发布求购</a>
        </router-link>
				<router-link tag="a" to="/releaseSupplyPage" v-else>
          <a>发布供应</a>
        </router-link>
        吧
			</div>
			<!-- 合作厂家的列表 -->
			<div class="imgSearch-bestCompany">
				<p class="imgSearch-bestCompany-tip">没找到合适的？可以找优质厂家开机</p>
				<ts-grid :data="companyBestList.list" class="imgSearch-data">
			    <ts-grid-item style="width:400px" v-for="product in companyBestList.list" :key="product" @click="handleGotoShop(product)">
			      <ts-image
			       width="371"
			       height="260"
			       :canView="false"
			       disabledHover
			       :src="product.pic">
			       </ts-image>
			       <div slot="footer" class="onepx imgSearch-data-menu">
							 	<a>
									找他开机
								</a>
						</div>
			     </ts-grid-item>
			  </ts-grid>
			</div>
	  </div>
		<div class="imgSearch-footer">
			<p>我也可以开机？赶紧联系客服谈合作吧</p>
			<p>免费热线</p>
			<p>400-801-3357</p>
		</div>
		<cropper-dialog :dialog="Cropper" :imageUrl="Pic.encoded" @check="handleLookProduct" @close="handleClose" @change="handleGetResult">
		</cropper-dialog>
	</div>
</template>

<script>
import {
  getCompanyBestList
} from '@/common/api/api';
import DICT from '@/common/dict';
import {
  mapGetters
} from 'vuex';
import CropperDialog from '@/components/search/searchImgDialog.vue';
export default {
  data() {
    return {
      // 双向绑定 => 与searchImgDialog中 dialog.show对应
      Cropper: {
        show: false
      },
      // XXX:仓库管理搜图=>搜图暂时可以跳去编辑页面
      Type: {
        edit: false
      },
      companyBestList: {},
      Pic: {
        destImg: '',
        url: '',
        naturalHeight: 0,
        naturalWidth: 0,
        encoded: '',
        canCropper: true
      },
      DICT: {
        productType: DICT.SupplyType
      },
      Params: {
        id: '',
        pageNo: 1,
        pageSize: 10
      }
    };
  },
  watch: {
    $route(to, from) {
      this.Params.pageNo = 1;
      this.Pic.encoded = JSON.parse(sessionStorage['find-pic']).encoded;
      this.Params.id = to.query.imgId;
      this.$store.commit('SET_SEARCH_EMPTY');
      this.$store.dispatch('searchGetResult', this.Params);
    },
    search: {
      handler(val) {
        if (val.list[0]) {
          // this.Pic.encoded = val.list[0].defaultPicUrl;
          let img = new Image();
          img.src = this.Pic.encoded;
          img.onload = () => {
            this.Pic.canCropper = true;
          };
          img.onerror = () => {
            this.Pic.canCropper = false;
          };
        }
      },
      deep: true
    }
  },
  components: {
    CropperDialog
  },
  beforeDestroy() {
    this.$store.commit('SET_PROGRESS', 1);
    this.$store.commit('SET_HANDLE_STATUS', false);
    this.$store.commit('CLEAR_INTERVAL');
    this.$store.commit('SET_SEARCH_EMPTY');
  },
  computed: {
    ...mapGetters(['search', 'userInfo']),
    isShopRoute() {
      return this.$route.path.indexOf('/shop/') >= 0;
    }
    // 去搜索列表第一个数据
  //   firstProductNo() {
  //     if (this.search.list[0]) {
  //       return this.search.list[0].productNo;
  //     }
  //   }
  },
  methods: {
    handleLoadMore() {
      this.Params.pageNo++;
      this.$store.dispatch('searchGetResult', this.Params);
    },
    handleGotoDress(item) {
      sessionStorage.setItem('flowerUrl', item.defaultPicUrl);
      this.$router.push({
        path: `/threeDDressPage`
      });
    },
    // 进入商店
    handleGotoShop(item) {
      this.goto(`/shop/${item.companyId}`);
    },
    handleClose() {
      this.Pic.encoded = JSON.parse(sessionStorage['find-pic']).encoded;
    },
    // 选择图片
    handleChoosePic(pic) {
      this.Pic.encoded = pic;
      this.Cropper.show = true;
    },
    // 寻找花型(最终一步)
    async handleLookProduct(item) {
      await this.$store.dispatch('getSearchEncoded', {
        category: item.category,
        encoded: item.encoded,
        searchType: 300
      });
    },
    // 裁剪---开始搜索结果
    handleGetResult(val) {
      this.$router.push({
        path: '/search/image',
        query: {
          imgId: val
        }
      });
    },
    // XXX:仓库管理搜图=>搜图暂时可以跳去编辑页面
    handleViewProduct(id) {
      if (this.Type.edit) {
        this.$router.push({
          path: `/shopManagePage/addwarehouse`,
          query: {
            id: id
          }
        });
      } else {
        this.goto(`/product/${id}`);
      }
    }
  },
  async created() {
    // XXX:从仓库管理跳过来，暂时给他跳去编辑页面
    if (this.$route.query.type) {
      this.Type.edit = true;
    }
    // 如果url存在id =》加载数据
    if (this.$route.query.imgId) {
      this.Params.id = this.$route.query.imgId;
      this.$store.dispatch('searchGetResult', this.Params);
      this.companyBestList = (await getCompanyBestList({
        pageNo: 1,
        pageSize: 3
      })).data.data;
      this.Pic.canCropper = this.search.list.length > 0;
    }
    if (sessionStorage['find-pic']) {
      this.Pic.encoded = JSON.parse(sessionStorage['find-pic']).encoded;
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace imgSearch{
	@component tip{
		line-height: 50px;
		a{
			color:#4C93FD;
		}
	}
  @component result{
    width: 650px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
	@component data{
		@descendent menu{
			width: 100%;
			line-height: 40px;
		}
		@descendent item{
			width: 240px;
			&:hover{
				.imgSearch-image-box-menu{
					display:table;
				}
			}
		}
	}
  @component editPic{
		@modifier menu {
			text-align: center;
			clear: both;
			padding-top: 16px;
			button {
				margin: 0 4px;
			}
		}
  }
	@component pagination{
		display: table;
		margin: 7px auto;
	}
  @component image-box{
    position: relative;
    max-width: 150px;
    &:hover{
      .imgSearch-image-box-tip{
        display: inline-block;
      }
    }
		@descendent watermask{
			position: absolute 0 20px * *;
		}
		@descendent img{
			position: relative;
		}
		@descendent menu{
			position: absolute * 0 0 0;
			display: none;
			table-layout: fixed;
			width: 100%;
			max-width:170px;
			margin: 0 auto;
			i[class*='icon-']{
				&:before{
					color:#fff;
				}
			}
			p{
				background: rgba(0,0,0,0.3);
				color: #fff;
				display: table-cell;
				width: 50%;
				position: relative;
				height: 30px;
				vertical-align: middle;
				cursor: pointer;
				transition: .8s;
				&:hover{
					background: rgba(0,0,0,0.5);
				}
				&:first-child:after{
					content:'';
					position:absolute;
					right: 0;
					height: 100%;
					top:0;
					width: 1px;
					background: #fff;
				}
			}
		}
    @descendent text{
      margin-left:30px;
      p{
        line-height: 35px;
  			&:nth-of-type(1){
  				font-size: 20px;
  				letter-spacing: 0;
  			}
  			&:nth-of-type(2){
  				color: #FF8400;
          margin-top: 20px;
  			}
        &:nth-of-type(3){
  				color: #999;
  			}
  		}
    }
    @descendent tip{
      position: absolute * 0 0 0;
      display: inline-block;
      height: 28px;
      line-height: 28px;
      background: rgba(0,0,0,0.4);
      color: #fff;
      display: none;
      cursor: pointer;
      text-align: center;
    }
  }
	@component bestCompany{
		@descendent tip{
			text-align: left;
			line-height: 50px;
		}
	}
	@component footer{
		text-align: center;
		p{
			&:nth-of-type(1){
				font-size: 14px;
				color: #999999;
				margin: 10px 0;
				letter-spacing: 0;
			}
			&:nth-of-type(2){
				font-size: 18px;
				color: #666666;
			}
			&:nth-of-type(3){
				font-size: 18px;
				color: #FF8400;
				margin-bottom: 10px;
			}
		}
	}
	@component tag{
		a{
			color:#fff;
			&:hover{
				color:#FF8400;
			}
		}
	}
	@component wrapper{
		text-align: center;
	}

}
</style>
