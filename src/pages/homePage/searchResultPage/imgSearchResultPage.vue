<template lang="html">
	<div class="">
	<v-header>
		<search></search>
	</v-header>
	<v-nav></v-nav>
	<div class="imgSearch-content">
    <div class="imgSearch-result">
      <img :src="Pic.encoded" width="50" height="50" ref="uploadImg">
      <span @click="handleChoosePic">手动框图</span>
      <p>对该图片的最佳猜测：{{Search[0].productNo}}</p>
      <p>对结果不满意？重新框图试试</p>
      <p>白色的花型更能被查找到哦！所以请尽量添加白色无干扰的花型样板。</p>
    </div>
		<div class="imgSearch-wrapper">
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
      <ts-button type="plain" @click="handleLoadMore">查看更多</ts-button>
			<p class="imgSearch-tip">
				没找到合适的？赶紧<a>发布求购</a>吧
			</p>
			<div class="imgSearch-bestCompany">
				<p class="imgSearch-bestCompany-tip">没找到合适的？赶紧<a>发布求购</a>吧</p>
				<ts-grid :data="companyBestList" class="imgSearch-data">
			    <ts-grid-item style="width:400px" v-for="product in companyBestList" :key="product" @click="handleViewProduct(product.id)">
			      <ts-image
			       width="300"
			       height="260"
			       :canView="false"
			       disabledHover
			       :src="product.pic">
			       </ts-image>
			       <div slot="footer" class="onepx imgSearch-data-menu" @click.stop="handleGotoShop(product)">
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
    <cropper-dialog v-model="Cropper.dialog" :imageUrl="Pic.encoded" @change="handleGetDestImg">
      <ts-radio-group v-model="Filter.categorys" class="search-editPic--menu" @change="handleLookProduct">
        <ts-radio :label="item.dicValue" v-for="item in dicTree.PRODUCT_TYPE" :key="item.dicValue">搜{{item.name}}</ts-radio>
      </ts-radio-group>
    </cropper-dialog>
	</div>
		</div>
</template>

<script>
import {
  header,
  nav,
  search
} from '@/components';
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
      Cropper: {
        dialog: false
      },
      Filter: {
        categorys: ''
      },
      Pic: {
        destImg: '',
        url: '',
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
    search: {
      handler(val) {
        this.Search = this.Search.concat(val.list.list);
      },
      deep: true
    }
  },
  components: {
    vHeader: header,
    vNav: nav,
    search,
    CropperDialog
  },
  computed: {
    ...mapGetters(['search', 'dicTree'])
  },
  methods: {
    handleLoadMore() {
      this.Params.pageNo++;
    },
    handleGotoShop(item) {
      this.$router.push({
        name: 'shop',
        params: {
          id: item.companyId
        }
      });
    },
    handleChoosePic(pic) {
      this.Pic.url = this.Pic.encoded;
      this.Cropper.dialog = true;
    },
    // 获取裁剪的图片base64
    handleGetDestImg(pic) {
      this.Pic.destImg = pic;
    },
    async handleLookProduct(e) {
      await this.$store.dispatch('getSearchEncoded', {
        category: e,
        encoded: this.Pic.destImg,
        searchType: 300
      });
      this.Cropper.dialog = false;
      await this.$router.push({
        path: '/imgSearch',
        query: {
          search: this.$store.getters.search.id
        }
      });
    },
    handleViewProduct(id) {
      this.$router.push({
        path: `/product/${id}`
      });
    }
  },
  async created() {
    if (this.$route.query.search) {
      this.Params.id = this.$route.query.search;
    }
    this.Pic = JSON.parse(sessionStorage.getItem('find-pic'));
    this.companyBestList = (await getCompanyBestList({
      pageNo: 1,
      pageSize: 3
    })).data.data.list;
  }
};
</script>

<style lang="css" scoped>
@component-namespace imgSearch{
  @component content{
      background: #fff;
			max-width: 1200px;
			padding: 0 6px;
			margin: 0 auto;
  }
	@component tip{
		line-height: 50px;
		a{
			color:#4C93FD;
		}
	}
	@component data{
		@descendent menu{
			width: 100%;
			line-height: 40px;
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
