<template>
  <div style="height: 100%;" align="center">
    <!--<el-image v-for="url in urls1" :key="url" :src="url" lazy align=""></el-image>-->
    <el-image :key="src" :src="src" lazy></el-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // src: 'http://pic.51yuansu.com/pic3/cover/00/71/75/58b05be054ba8_610.jpg'
      // 'http://pic.51yuansu.com/pic3/cover/03/23/04/5b6e14dfe58b4_610.jpg'
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577014589521&di=9cc9a8ccfd5f06c4d8059f260336fc06&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Ff%2F541164c5790af.jpg'
      // src: 'http://static1.anquan.org/static/user_upload/zorro/20151020/china2.png',
      // urls1: [
      //   'http://pic.51yuansu.com/pic3/cover/01/77/79/59665a565ed0f_610.jpg',
      //   'http://pic.51yuansu.com/pic3/cover/00/71/75/58b05be054ba8_610.jpg'
      // ],
      // urls2: [
      //   'http://static1.anquan.org/static/user_upload/zorro/20151020/china2.png',
      //   'http://pic.51yuansu.com/pic3/cover/03/23/04/5b6e14dfe58b4_610.jpg'
      // ]
    }
  },
  created() {
  }
}
</script>
