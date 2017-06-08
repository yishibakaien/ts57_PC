<template lang="html">
	<div class="imgSearch-content">
    <div class="imgSearch-result">
      <div class="imgSearch-image-box">
        <img :src="Pic.encoded" width="150" height="150" ref="uploadImg">
        <span class="imgSearch-image-box-tip" @click="handleChoosePic">手动框图</span>
      </div>
      <div class="imgSearch-image-box-text">
        <p>对该图片的最佳猜测：{{firstProductNo}}</p>
        <p>对结果不满意？重新框图试试</p>
        <p>白色的花型更能被查找到哦！所以请尽量添加白色无干扰的花型样板。</p>
      </div>
    </div>
		<ts-title-block :bodyStyle="{'font-size':'20px'}">
			<i class="icon-huaxin"></i>&nbsp;相似花型
		</ts-title-block>
		<div class="">
			<ts-grid :data="Search" class="textSearch-data">
		    <ts-grid-item style="width:240px" v-for="product in Search" :key="product" @click="handleViewProduct(product.id)">
		      <ts-image
		       width="170"
		       height="170"
		       :canView="false"
		       disabledHover
		       :src="product.defaultPicUrl">
		       </ts-image>
		       <p>{{product.companyName}}</p>
		       <template slot="footer">
             <span>{{product.productNo}}</span>
		         <span>{{product.publishDate}}</span>
		       </template>
		     </ts-grid-item>
		  </ts-grid>
      <br/>
			<div class="imgSearch-tip imgSearch-wrapper">
        <p><ts-button type="plain" @click="handleLoadMore">查看更多</ts-button></p>
				没找到合适的？赶紧
        <router-link tag="a" to="/releasePurchasePage">
          <a>发布求购</a>
        </router-link>
        吧
			</div>
			<div class="imgSearch-bestCompany">
				<p class="imgSearch-bestCompany-tip">没找到合适的？可以找优质厂家开机</p>
				<ts-grid :data="companyBestList.list" class="imgSearch-data">
			    <ts-grid-item style="width:400px" v-for="product in companyBestList.list" :key="product" @click="handleGotoShop(product)">
			      <ts-image
			       width="300"
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
    <cropper-dialog :dialog="Cropper" :imageUrl="Pic.encoded" @change="handleGetDestImg">
      <ts-radio-group v-model="Filter.categorys" class="imgSearch-editPic--menu" @change="handleLookProduct">
        <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">搜{{item.name}}</ts-radio>
      </ts-radio-group>
    </cropper-dialog>
	</div>
</template>

<script>
import {
  getCompanyBestList
} from '@/common/api/api';
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
      Filter: {
        categorys: ''
      },
      companyBestList: {},
      Pic: {
        destImg: '',
        url: '',
        naturalHeight: 0,
        naturalWidth: 0,
        encoded: ''
      },
      Search: [],
      Params: {
        id: '',
        pageNo: 1,
        pageSize: 10
      }
    };
  },
  watch: {
    Params: {
      handler(val) {
        this.$store.dispatch('searchGetResult', this.Params);
      },
      deep: true
    },
    $route(to, from) {
      this.Params.id = to.query.imgId;
    },
    search: {
      handler(val) {
        this.Search = val.list.list;
      },
      deep: true
    }
  },
  components: {
    CropperDialog
  },
  destroyed() {
    this.$store.commit('SET_HANDLE_STATUS', false);
    this.$store.commit('CLEAR_INTERVAL');
  },
  computed: {
    ...mapGetters(['search', 'dicTree']),
    isShopRoute() {
      return this.$route.path.indexOf('/shop/') >= 0;
    },
    // 去搜索列表第一个数据
    firstProductNo() {
      if (this.Search[0]) {
        return this.Search[0].productNo;
      }
    }
  },
  methods: {
    handleLoadMore() {
      this.Params.pageNo++;
    },
    // 进入商店
    handleGotoShop(item) {
      this.$router.push({
        name: 'shop',
        params: {
          id: item.companyId
        }
      });
    },
    // 选择图片
    handleChoosePic(pic) {
      this.Pic.url = this.Pic.encoded;
      this.Cropper.show = true;
    },
    // change--获取裁剪的图片base64
    handleGetDestImg(pic) {
      this.Pic.destImg = pic;
    },
    // 寻找花型(最终一步)
    async handleLookProduct(e) {
      sessionStorage.setItem('find-pic', JSON.stringify({
        encoded: this.Pic.destImg
      }));
      this.$store.commit('SET_HANDLE_STATUS', true);
      this.$store.commit('SET_PROGRESS', 1);
      this.Cropper.show = false;
			this.historyItems.set(this.Pic.destImg);
      this.Pic.encoded = this.Pic.destImg;
      await this.$store.dispatch('getSearchEncoded', {
        category: e,
        encoded: this.Pic.destImg,
        searchType: 300
      });
      if (this.$store.getters.search.id) {
        await this.$router.push({
          path: this.isShopRoute ? `/shop/${this.$route.params.id}/s/image` : '/search/image',
          query: {
            imgId: this.$store.getters.search.id
          }
        });
      }
    },
    handleViewProduct(id) {
      this.$router.push({
        path: `/product/${id}`
      });
    }
  },
  async created() {
    if (this.$route.query.imgId) {
      this.Params.id = this.$route.query.imgId;
      this.companyBestList = (await getCompanyBestList({
        pageNo: 1,
        pageSize: 3
      })).data.data;
    }
    // 从sessionStorage获取裁剪的图片
    this.Pic = JSON.parse(sessionStorage.getItem('find-pic'));
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
	}
  @component editPic{
    @modifier menu{
      clear: both;
      padding-top: 15px;
    }
  }
  @component image-box{
    position: relative;
    max-width: 150px;
    &:hover{
      .imgSearch-image-box-tip{
        display: inline-block;
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
	@component wrapper{
		text-align: center;
	}

}
</style>
