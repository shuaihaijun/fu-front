<template>
  <div style="height: 100%;" align="center">
    <el-image v-for="url in urls1" :key="url" :src="url" lazy align=""></el-image>
    <el-image v-for="url in urls2" :key="url" :src="url" lazy></el-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // src: 'http://pic.51yuansu.com/pic3/cover/00/71/75/58b05be054ba8_610.jpg'
      // 'http://pic.51yuansu.com/pic3/cover/03/23/04/5b6e14dfe58b4_610.jpg'
      // 'http://pic.51yuansu.com/pic3/cover/01/77/79/59665a565ed0f_610.jpg'
      // src: 'http://static1.anquan.org/static/user_upload/zorro/20151020/china2.png',
      urls1: [
        'http://pic.51yuansu.com/pic3/cover/01/77/79/59665a565ed0f_610.jpg',
        'http://pic.51yuansu.com/pic3/cover/00/71/75/58b05be054ba8_610.jpg'
      ],
      urls2: [
        'http://static1.anquan.org/static/user_upload/zorro/20151020/china2.png',
        'http://pic.51yuansu.com/pic3/cover/03/23/04/5b6e14dfe58b4_610.jpg'
      ]
    }
  },
  created() {
  }
}
</script>
