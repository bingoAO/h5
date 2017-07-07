<template>
  <div class="mask">
  <div class="container">

    <!--信息展示-->
    <div class="info_show">
      <!--介绍图片-->
      <div class="img_inroduce_parent">
        <img class="img_inroduce" src="../assets/logo.png"/>
      </div>
      <!--用户选择结果展示-->
      <ul class="choosen_info">
        <li v-if="choosenShow.length">{{choosenShow}}</li>
        <li v-else>尚未选择尺码</li>

        <li>
          <span v-if="this.userChoosen.count">¥85 X {{this.userChoosen.count}}</span>
          <span v-else>¥85</span>
        </li>
      </ul>
      <!--取消按钮-->
      <div class="cancel_icon">
        <img src="../assets/cancel.png"/>
      </div>
    </div>

    <!--用户选择-->
    <div class="user_chooser">
    <!--尺码 颜色 图案 选择表-->
    <div class="spec_item" v-for="item in specificationArr" v-if="item.value.length">
      <h2 v-if="!(item.key =='size')">{{item.title}}</h2>

      <div class="specification_title" v-else>
        <h2 class="size_title">{{item.title}}</h2>
        <div class="size_tooptip">84%的已购用户说该品牌"尺码合适"</div>
        <div class="size_goto" @click="gotoSizePage"><div class="goto">尺码对照表</div></div>
      </div>

      <ItemButton :buttons="item.value" :cuskey='item.key' @changeUserChoose="changeUserChoose">
      </ItemButton>

      <ul class="size_spec" v-if="item.key =='size'">
        <li v-for="(item,index) in sizeSpec[sizeChoosen]" :class="{darkBg:index ==0}">
          <div>{{item.name}}</div>
          <div>{{item.value}}</div>
        </li>
      </ul>
    </div>

    <!--数量-->
      <div class="spec_item">
    <h2>数量</h2>
    <ul class="counter">
      <li class="decrement" @click="decrement" :class="{unactive:this.userChoosen.count==0}">-</li><li class="sum">{{this.userChoosen.count}}</li><li class="increment" @click="increment">+</li>
    </ul>
        <span class="no_store" v-if="!nostore">暂无库存</span>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
  import ItemButton from '../components/ItemButton.vue'
  export default {
    mounted(){
      this.initSpecificationArr();
//      this.initStoreInfo();
      console.log('router',this.$router);
    },
    data(){
      return {
        skus: require('../assets/skus.json').skus,
        sizeSpec:require('../assets/size.json'),
        sizeChoosen:'',
        specificationIndex:[{key:'size',title:'尺寸'},{key:'color',title:'颜色'},{key:'pattern',title:'图案'}],
        specificationArr:[],
        storeInfo:{},
        userChoosen:{size:'',count:0,color:'',pattern:''}

      }
    },
    components:{
      ItemButton
    },
    methods: {
      range: function (skus, key) {
        //获取范围
        let range = skus.map(function (sku) {
          return sku.attrs[key];
        });
        console.log('range', range);
        //去重复
        range = range.filter(function (item, index) {
          return item && range.indexOf(item) === index
        });
        console.log('去重复range', range);

        return range;
      },
      //初始化可选规格数组
      initSpecificationArr:function () {
        let _self = this;
        this.specificationArr = this.specificationIndex.map(function (item) {
          return {
            key:item.key,
            value: _self.range(_self.skus, item.key),
            title:item.title
          }
        })
      },
      //初始化库存信息
      initStoreInfo:function () {
        let self = this;
         this.skus.filter(function (sku) {
//          let key = ""+sku.attrs.color + sku.attrs.size +sku.attrs.pattern
//           if(!self.storeInfo[key] || self.storeInfo[key]>sku.instock) {
//             self.storeInfo[key] = sku.instock;
//           }
          if(!sku.instock)
          return sku;
        });

        console.log('sotreInfo',this.storeInfo);
      },
      increment:function () {
        this.userChoosen.count++;
      },
      decrement:function () {
        if(this.userChoosen.count>0) {
          this.userChoosen.count--;
        }
      },
      changeUserChoose:function (key, value) {
        if (key === 'size') {
          this.sizeChoosen = value;
        }
        this.userChoosen[key] = value;
        console.log(this.userChoosen);
      },
      gotoSizePage(){
        const router = this.$router;
        router.push('/specification');
      }
    },
    computed:{
      choosenShow:function () {
        var result = '';
        if(this.userChoosen.size){
          result = result + '"'+this.userChoosen.size+'" '
        }
        if (this.userChoosen.color){
          result = result + '"'+this.userChoosen.color+'" '
        }
        if (this.userChoosen.pattern){
          result = result + '"'+this.userChoosen.pattern+'" '
        }

        if(result.length){
          result = '已选 ' + result;
        }
        return result;
      },
      nostore:function () {
        //color size pattern
        let _self = this;
        let tmp = false;
        this.skus.map(function (sku) {
          if((_self.userChoosen.size&&sku.attrs.size==_self.userChoosen.size||!_self.userChoosen.size)&&
            (_self.userChoosen.color&&sku.attrs.color==_self.userChoosen.color||!_self.userChoosen.color)&&
            (_self.userChoosen.pattern&&sku.attrs.pattern==_self.userChoosen.pattern||!_self.userChoosen.pattern)&&sku.instock){
             tmp = true;
          }
        });
        console.log('tmp,',tmp,_self.userChoosen);
        return tmp;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  /*定义全局的颜色*/
  @title_color :#444444;
  @normal_text_color : #666666;
  @border_color: #e8e8e8;
  @anotation_color:#a3a3a3;

  @light_background:#e8e8e8;
  @dark_background:#d3d3d3;
  @toolkit_bg:#eaa828;

  /*定义全局的文字大小*/
  .title_size(){
    font-size: 32px;
  }
  .normal_size(){
    font-size: 28px;
  }
  .annon_size(){
    font-size:  22px;
  }

  @padding_lr:4.4rem;
  @radius:1rem;

  @img_introduce_width :24rem;
  @img_introduce_height :24rem;

  @info_show_height :20rem;
  @info_show_bottom:2rem;

  .border-radius(@radius) {
    border-radius: @radius;
    -webkit-border-radius: @radius;
  }

  .border-radius-left(@radius){
    border-bottom-left-radius: @radius;
    border-top-left-radius: @radius;
    -webkit-border-top-left-radius: @radius;
    -webkit-border-bottom-left-radius: @radius;
  }

  .flexColumn(){
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
  }

  .flexRow(){
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
  }

  .flex1(){
    flex: 1;
    -webkit-flex: 1;
  }

  .noListStyle(){
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding:  0;
  }

  ul{
  .noListStyle();
  }

  /*div {*/
    /*border: 1px solid darkgreen;*/
  /*}*/

  body {
    margin:0;
    padding: 0;
    margin-top: 100px;
    color: @normal_text_color;
  }

  .mask{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;  }

  .container {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding-bottom: 2rem;
    background: white;
  }

  .user_chooser{
    padding-left: @padding_lr;
    padding-right: @padding_lr;
  }

  .choosen_info {
    height: 100%;
    position: relative;
    padding-left: 3rem;
    .flexColumn();
    .normal_size();
    :first-child{
      color: @title_color;
      padding-top: 6rem;
      .flex1();
     };
    :last-child{
      color: red;
    }
  }

  /*信息展示*/
  .info_show {
    position: relative;
    height: @info_show_height;
    padding-bottom: @info_show_bottom;
    border-bottom: 0.2rem solid @border_color;
    padding-left: @padding_lr;
    padding-right: @padding_lr;

  /*图片介绍*/
  .img_inroduce_parent {
    position: absolute;
    width: @img_introduce_width;
    text-align: center;
    height: @img_introduce_height;
    bottom: @info_show_bottom;
    border: 0.2rem solid @border_color;
    background: white;
    .img_inroduce{
      height: 100%;
    }
  }

  /*用户选择结果*/
  .choosen_info {
    margin-left: @img_introduce_width;
  }

  /*取消按钮*/
  .cancel_icon {
    position: absolute;
    right: 1rem;
    top: 2rem;
  }

  }

  .spec_item{
    margin-top: 3rem;
    .counter{
      display: inline-block;
    }
    .no_store{
      color: red;
      .annon_size();
      margin-left: 2rem;
    }
  }

  .specification_title{
    position:relative;
    .size_tooptip,.size_goto,.size_title{
      display: inline-block;
    }
  .size_tooptip,.size_goto {
  .normal_size();
  }

    .size_tooptip{
      @arrow_length:1.5rem;
      @arrow_left:0.3rem;

      position: relative;
      background: @toolkit_bg;
      color: white;
      padding: 1rem;
      margin-left: 2rem;
      .border-radius(0.5rem);
      &:before{
        position: relative;
        display: inline-block;
        border-top: 1rem solid transparent;
        border-right: @arrow_length solid @toolkit_bg;
        border-bottom: 1rem solid transparent;
        border-right-color: @toolkit_bg;
        left:-((@arrow_length)-(@arrow_left))*2;
        content: '';
      }
    }
    .size_goto{
    @arrow_length:1.4rem;
    @arrow_left:0.4rem;
    @arrow_height:0.8rem;

      height: 6rem;
      line-height: 6rem;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -3rem;
      .goto{
        @height:6rem;
        position: relative;
        display: inline-block;
        color:@anotation_color;
        text-decoration: underline;
        height:@height;

        &:before{
          position: absolute;
          display: inline-block;
          border-top: @arrow_height solid transparent;
          border-left: @arrow_length solid white;
          border-bottom: @arrow_height solid transparent;
          border-right-color: @anotation_color;
          top:@height/2;
           margin-top: -(@arrow_height);
          right:(@arrow_length)-(@arrow_left);
          z-index: 2;
          right:-((@arrow_length)-(@arrow_left));
          content: '';
        }
        &:after{
          position: absolute;
          display: inline-block;
          border-top: @arrow_height solid transparent;
          border-left: @arrow_length solid @anotation_color;
          border-bottom: @arrow_height solid transparent;
          border-right-color: @anotation_color;
           top:@height/2;
           margin-top: -(@arrow_height);
          /*left:0;*/
          /*top:(@arrow_height)/2;*/
          content: '';
        }
      }

    }
  }

  h2{
    color: @title_color;
    .title_size();
  }

  .size_spec{
    .flexRow();
    margin-top: 1rem;
    background:@light_background;
    .border-radius(@radius);
    .annon_size();
    li{
      .flex1();
      display: inline-block;
      text-align: center;
      padding-top: 0.5rem;
      padding-bottom: 1rem;
      div{
        padding: 0.5rem;
      }
    }
  }

  .darkBg{
    background: @dark_background;
    .border-radius-left(@radius);
  }

  /*数量加减*/
  .decrement,.sum,.increment{
    margin:0;
    display: inline-block;
    padding:1rem 2rem;
    border: 2px solid @border_color;
    color: @normal_text_color;
    .normal_size();
  }
  .decrement,.sum{
    border-right: 0;
  }

  .unactive{
    color: @border_color;
  }
</style>
