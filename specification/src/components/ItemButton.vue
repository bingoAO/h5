<template>
    <ul>
      <li v-for="(item,index) in buttons" :class="{btn_active:active === index}" @click="choose(item,index)">
        {{item}}
        <i class="right_top" v-if="active === index"></i>
      </li>
    </ul>
</template>
<script>
    export default{
      methods:{
        choose:function (item,index) {
          if(this.active === index){
            this.active = '';
            this.$emit('changeUserChoose', this.cuskey, '');
          }else {
            this.active = index;
            this.$emit('changeUserChoose', this.cuskey, item);
          }
        }
      },
      data(){
        return{
          active:''
        }
      },
       props:{
         buttons:{//{active:'1',texts:[]}
           type:Array,
           required:true
         },
         cuskey:{
           type:String
         }
       }
    }
</script>

<style lang="less" scoped>
  .normal_size(){
    font-size: 28px;
  }
  @normal_text_color : #666666;

  @border_color: #e8e8e8;
  .border-radius(@radius) {
    border-radius: @radius;
    -webkit-border-radius: @radius;
  }

  ul{
    padding: 0;
    margin:0;
    list-style: none;
  }

  li{
    position: relative;
    overflow: hidden;
  .border-radius(0.5rem);
    padding:1rem 3rem;
    border: 0.2rem solid @border_color;
    display: inline-block;
    margin-right: 2rem;
    .normal_size();
    color: @normal_text_color;
  }
  .right_top{
    position: absolute;
    top:-0.9rem;
    right: -0.9rem;
    width: 2.8rem;
    height: 2.8rem;
    background-image: url("../assets/right_top_icon.png");
  }
  .btn_active{
    color: red;
    border: 2px solid red;
  }

  /*箭头类*/

</style>
