<template>
  <div>
    <van-nav-bar title="我的资料" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell icon="points" title="头像" is-link @click="onImageClick">
        <van-image class="profile-avater" round :src="user.photo"> </van-image>
      </van-cell>
      <!-- hidden隐藏表单元素 -->
      <input type="file" hidden ref="file" @change="onFileChange" />
      <van-cell icon="gold-coin-o" title="昵称" is-link />
      <van-cell icon="gift-o" title="介绍" is-link />
      <van-cell icon="user-o" title="性别" is-link />
      <van-cell icon="user-o" title="生日" is-link />
    </van-cell-group>
    <!-- slot="cover"作为插槽插入组件内部 -->
    <!-- @close="$refs.file.value = '' 关闭时清空input，下次即使选择同样图片仍会触发change事件 -->
    <van-image-preview v-model="isPreviewShow" :images="images" @close="$refs.file.value = ''">
      <van-nav-bar slot="cover" left-text="取消" right-text="确定" @click-left="isPreviewShow = false" @click-right="onUpdateImage" />
    </van-image-preview>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Image, ImagePreview } from 'vant'
import { updateUserPhoto } from '@/api/user'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      user: {
        photo:
          'https://cdn2.jianshu.io/assets/default_avatar/6-fd30f34c8641f6f32f5494df5d6b8f3c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120'
      },
      isPreviewShow: false,

      // 预览的图片列表
      images: []
    }
  },
  computed: {
    // 返回file的引用
    file() {
      return this.$refs['file']
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/user')
    },

    onImageClick() {
      // 手动触发input的点击事件
      this.file.click()
    },
    onFileChange() {
      // 拿到file类型的文件对象
      const fileObj = this.file.files[0]
      // global.console.log(fileObj)
      // 使用window.URL.createObjectURL(file) 得到文件URL
      const fileData = window.URL.createObjectURL(fileObj)
      // global.console.log(fileData)
      // 将img的src设置为该url
      this.images = [fileData]
      // 显示图片预览
      this.isPreviewShow = true
    },
    // 修改图片
    async onUpdateImage() {
      // 构造包含文件数据的表单对象 FormData
      const fd = new FormData()
      fd.append('file', this.file.files[0])

      // 请求提交
      try {
        const res = await updateUserPhoto(fd)
        global.console.log(res)
        this.user.photo = res.url
        this.$toast.success('成功')
        this.isPreviewShow = false
      } catch (error) {
        this.$toast.fail('失败')
        global.console.log(error)
      }

      // 根据响应结果进行后续处理
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  &-avater {
    height: 30px;
    width: 30px;
  }
}
/deep/ .van-image-preview__cover {
  top: unset;
  left: 0;
  right: 0;
  bottom: 0;
  .van-nav-bar {
    background: #000;
    &::after {
      border: none;
    }
  }
}
</style>
