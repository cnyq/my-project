<template>
  <div
    class="upload"
    :class="{
      'limit-upload': isBeyondLimit,
      'disable-transition': disabledTransition,
    }"
  >
    <el-upload
      action
      ref="upload"
      :class="{
        'disabled-upload': disabled === '' || disabled,
      }"
      :disabled="disabled === '' || disabled"
      list-type="picture-card"
      :file-list="waitingUploadList"
      :accept="accept"
      :limit="limit"
      :multiple="multiple"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }" class="el-upload-list__slot">
        <el-progress
          v-show="file.uploadding"
          type="circle"
          :percentage="uploadPercentage"
          :width="100 - 0"
        >
        </el-progress>
        <template v-show="!file.uploadding">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.fileThumbnail"
            alt
          />
          <div class="el-upload-list__item-file-name">{{ file.fileName }}</div>
        </template>

        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            class="el-upload-list__item-download"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <viewer v-show="false" :images="waitingUploadListPreview">
      <img
        v-for="(src, index) in waitingUploadListPreview"
        width="100"
        :ref="'prevFile' + index"
        :src="src"
        :key="index"
      />
    </viewer>
    <el-dialog
      class="upload-fullscreen-dialog"
      :title="previewTitle"
      :visible.sync="previewVisible"
      fullscreen
    >
      <iframe :src="previewUrl" width="100%" height="100%"></iframe>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import * as qiniu from "qiniu-js"
import excel from "@/assets/icon/excel.png"
import pdf from "@/assets/icon/pdf.png"
import word from "@/assets/icon/word.png"
import video from "@/assets/icon/video.png"
import defaultFile from "@/assets/icon/file.png"

// 目录前缀
const directoryPrefix = "cms"
const ICON = {
  excel,
  pdf,
  word,
  video,
  defaultFile,
}
const dataURLtoBlob = (dataurl) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
const calcFileSizeInfo = (size) => {
  let information = ""
  if (size <= 1024) {
    information = size + " B"
  } else if (size <= 1024 * 1024) {
    information = size / 1024 + " KB"
  } else if (size <= 1024 * 1024 * 1024) {
    information = size / 1024 / 1024 + " MB"
  } else {
    information = size + "b"
  }
  return information
}

export default {
  name: "Upload",
  mounted() {
    if (this.accept) {
      let acceptMap = {}
      let acceptList = this.accept.replace(/\s+/g, "").split(",")
      acceptList.forEach((item) => {
        acceptMap[item] = true
      })
      this.acceptMap = acceptMap
    }
  },
  props: [
    "fileList",
    "limit",
    "size",
    "multiple",
    "accept",
    "listType",
    "disabled",
    "realTime",
    "dimension",
    "equalScaling",
  ],
  watch: {
    fileList: {
      immediate: true,
      handler(newList) {
        if (Array.isArray(newList)) {
          let waitingUploadList = []
          newList.forEach((item) => {
            const fileSuffix = item.slice(item.lastIndexOf("."))
            const fileType = this.getFileType(fileSuffix)
            let fileItem = {
              fileType,
              fileSuffix,
              fileName: item.slice(item.lastIndexOf("/") + 1),
              fileUrl: item,
            }
            if (fileType === "image") {
              fileItem.fileThumbnail = item
            } else {
              fileItem.fileThumbnail = ICON[fileType]
            }
            waitingUploadList.push(fileItem)
          })
          this.waitingUploadList = waitingUploadList
        }
      },
    },
    waitingUploadList: {
      immediate: true,
      handler(newList) {
        // 判断是否超出 最大文件上传个数
        if (this.limit) {
          this.isBeyondLimit = newList.length >= this.limit
        }
        let waitingUploadListPreview = []
        newList.forEach((item) => {
          if (item.fileType === "image") {
            waitingUploadListPreview.push(item.fileUrl || item.fileThumbnail)
          }
        })
        this.waitingUploadListPreview = waitingUploadListPreview
      },
    },
  },
  data() {
    return {
      isBeyondLimit: false,
      acceptMap: {},
      fileType2suffix: {
        "image/jpg": ".jpg",
        "image/jpeg": ".jpeg",
        "image/png": ".png",
        "image/bmp": ".bmp",
        "image/gif": ".gif",
        "image/tiff": ".tiff",
        "application/pdf": ".pdf",
        "application/msword": ".doc",
        "application/vnd.ms-excel": ".xls",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          ".docx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          ".xlsx",
        "video/mp4": ".mp4",
      },
      fileType: {
        image: [".jpeg", ".jpg", ".png", ".bmp", ".gif", ".tiff"],
        word: [".doc", ".docx"],
        excel: [".xls", ".xlsx"],
        pdf: [".pdf"],
        video: [".mp4"],
      },

      // 预览非图片类文件
      previewVisible: false,
      previewUrl: "",
      previewTitle: "文件预览",
      waitingUploadList: [],
      waitingUploadListPreview: [],
      uploadPercentage: 0,
      disabledTransition: false,
    }
  },
  methods: {
    handleExceed() {
      this.$message.warning("文件上传个数超出限制！")
    },

    handlePictureCardPreview(file) {
      // switch语句太丑，不想用。
      if (file.fileType === "image") {
        // 新上传的图片文件 取 缩略图字段匹配
        const prevIndex = this.waitingUploadListPreview.indexOf(
          file.fileUrl || file.fileThumbnail
        )
        setTimeout(() => {
          this.$refs["prevFile" + prevIndex][0].click()
        })
        return false
      }
      if (file.fileType === "pdf") {
        this.previewTitle = "文件预览   " + file.fileName
        this.previewUrl = file.fileUrl
        this.previewVisible = true
        return false
      }
      if (file.fileType === "word" || file.fileType === "excel") {
        this.previewTitle = "文件预览   " + file.fileName
        this.previewUrl = `https://view.officeapps.live.com/op/view.aspx?src=${file.fileUrl}`
        this.previewVisible = true
        return false
      }
      if (file.fileType === "video") {
        this.previewTitle = "文件预览   " + file.fileName
        this.previewUrl = file.fileUrl
        this.previewVisible = true
        return false
      }
      this.$message.warning(
        fileSuffix + " 后缀文件暂不支持预览，请联系技术运营。"
      )
    },
    handleDownload(file) {
      if (file.fileType === "image") {
        let image = new Image()
        image.setAttribute("crossOrigin", "anonymous")
        image.src = file.fileBase64 || file.fileUrl
        image.onload = function () {
          let dataURL = file.fileBase64
          if (!dataURL) {
            let canvas = document.createElement("canvas")
            canvas.width = image.width
            canvas.height = image.height
            let context = canvas.getContext("2d")
            context.drawImage(image, 0, 0, image.width, image.height)
            dataURL = canvas.toDataURL("image/png")
          }
          let blob_ = dataURLtoBlob(dataURL)
          let url = {
            name: file.fileName,
            src: blob_,
          }
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(url.src, url.name)
          } else {
            let link = document.createElement("a")
            link.setAttribute("href", window.URL.createObjectURL(url.src))
            link.setAttribute("download", url.name)
            document.body.appendChild(link)
            link.click()
          }
        }
      }

      if (file.fileType === "pdf") {
        this.previewTitle = "文件下载   " + file.fileName + "  (点击右上角下载)"
        this.previewUrl = file.fileUrl
        this.previewVisible = true
        return false
      }
      if (file.fileType === "word" || file.fileType === "excel") {
        window.open(file.fileUrl)
        return false
      }
      if (file.fileType === "video") {
        this.previewTitle =
          "文件下载   " +
          file.fileName +
          "  (点击右下角下载 或 点击右键、选择视频另存为)"
        this.previewUrl = file.fileUrl
        this.previewVisible = true
        return false
      }
      this.$message.warning(
        fileSuffix + " 后缀文件暂不支持下载，请联系技术运营。"
      )
    },
    handleRemove(file) {
      this.waitingUploadList.splice(this.waitingUploadList.indexOf(file), 1)
      this.$emit("selectedFile", this.waitingUploadList)
      // // 新添加的不触发emit
      // if (!file.raw) {
      //     this.$emit('selectedFile', this.waitingUploadList)
      // }
    },
    beforeUpload(file) {
      // console.log('file', file)
      // return
      // 判断是否超出上传个数，二次验证
      if (this.isBeyondLimit) {
        this.$message.warning("超出上传限制！")
        return false
      }
      // 判断大小限制
      if (this.size && file.size > this.size) {
        this.$message.warning(`文件大小不能超过 ${calcFileSizeInfo(this.size)}`)
        return false
      }
      if (this.dimension && JSON.stringify(this.dimension) !== "{}") {
        let fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onloadend = () => {
          // 获取图片宽高
          let img = new Image()
          img.src = fr.result
          img.addEventListener("load", () => {
            let { width, height } = this.dimension
            /* // 是否上传等比例图片
                  if (this.equalScaling) {
                    if (width && height && (width / img.width === height / img.height)) {
                      this.$message.warning(`请上传宽度为${width}px，高度为${height}px的图片(或与此宽高等比例的图片)`)
                      return false
                    } else {
                      this.imgUploadFn(file)
                    }
                  } else {
                    if ((width && width !== img.width) || (height && height !== img.height)) {
                      this.$message.warning(`请上传宽度为${width}px，高度为${height}px的图片`)
                      return false
                    } else {
                      this.imgUploadFn(file)
                    }
                  } */
            if (
              (width && width !== img.width) ||
              (height && height !== img.height)
            ) {
              this.$message.warning(
                `请上传宽度为${width}px，高度为${height}px的图片`
              )
              return false
            } else {
              this.imgUploadFn(file)
            }
          })
        }
      } else {
        this.imgUploadFn(file)
      }
      return false
    },
    imgUploadFn(file) {
      let fileSuffix = this.fileType2suffix[file.type]
      // 判断文件类型是否符合
      if (this.accept && !this.acceptMap[fileSuffix]) {
        this.$message.warning("上传的文件只能是 " + this.accept + " 格式!")
        return false
      }
      const fileType = this.getFileType(fileSuffix)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        let fileItem = {
          file,
          fileType,
          fileSuffix,
          fileBase64: reader.result,
          fileName: file.name,
          fileSize: file.size,
        }
        if (fileType === "image") {
          fileItem.fileThumbnail = reader.result
          // 判断是否阻止默认上传
          if (this.realTime !== undefined && this.realTime !== false) {
            this.singleUpload(fileItem)
          } else {
            this.waitingUploadList.push(fileItem)
            this.$emit("selectedFile", this.waitingUploadList)
          }
        } else {
          fileItem.fileThumbnail = ICON[fileType]
          this.singleUpload(fileItem)
        }
      }
    },
    singleUpload(fileItem) {
      this.uploadPercentage = 0
      this.waitingUploadList.push({
        uploadding: true,
      })
      this.$store.dispatch("qiniu/getQiniuToken").then((token) => {
        this.uploadQiniu(token, fileItem).then((fileUrl) => {
          fileItem.fileUrl = fileUrl
          const loaddingItemIndex = this.waitingUploadList.findIndex((item) => {
            return item.uploadding
          })
          // 禁用过渡 (解决进度条怪异问题)
          this.disabledTransition = true
          this.$set(this.waitingUploadList, loaddingItemIndex, fileItem)
          this.$emit("selectedFile", this.waitingUploadList)
          setTimeout(() => {
            this.disabledTransition = false
          }, 500)
        })
      })
    },
    // 内置提交方法
    async submit() {
      try {
        let token = await this.$store.dispatch("qiniu/getQiniuToken")
        let qiuniuPromise = []
        this.waitingUploadList.forEach((item) => {
          qiuniuPromise.push(this.uploadQiniu(token, item))
        })
        return Promise.all(qiuniuPromise)
      } catch (e) {
        return Promise.reject(e)
      }
    },

    // 匹配文件类型。
    getFileType(currentSuffix) {
      // 一般后缀不会超过5位， 超过5位说明为老系统  hash路径图片
      if (currentSuffix.length > 5) {
        return "image"
      }
      for (let key in this.fileType) {
        // 判断是否支持
        if (this.fileType[key].includes(currentSuffix)) {
          return key
        }
      }
      return "defaultFile"
    },
    uploadQiniu(token, fileItem) {
      const that = this
      return new Promise((resolve, reject) => {
        const file = fileItem.file
        // 新上传的才存在file字段
        if (file) {
          const fileName = file.name
          const uploadTime = new Date().getTime()
          const putExtra = {
            fname: fileName,
            params: {},
            mimeType: null,
          }
          const config = { useCdnDomain: true }
          const observable = qiniu.upload(
            file,
            `${uploadTime}-${fileItem.fileSize}/${directoryPrefix}/${fileName}`,
            token.imgToken,
            putExtra,
            config
          )
          observable.subscribe(
            function (res) {
              that.uploadPercentage = Math.floor(res.total.percent)
            },
            function () {},
            function (res) {
              resolve(token.qiniuUrl + "/" + res.key)
            }
          )
        } else {
          resolve(fileItem.fileUrl)
        }
      })
    },

    // 内置方法
    getFilesInfo() {
      let filesInfo = []
      this.waitingUploadList.forEach((item) => {
        let fileItem = {
          fileName: item.fileName,
          fileSize: item.fileSize,
          fileSuffix: item.fileSuffix,
          fileThumbnail: item.fileThumbnail,
          fileType: item.fileType,
        }
        // 含 file 的是新上传的文件
        if (!item.file) {
          item.fileUrl.replace(/(\d*)-(\d*)\/cms/g, (e, $1, $2) => {
            fileItem.fileSize = $2
          })
        }
        filesInfo.push(fileItem)
      })
      return filesInfo
    },
  },
}
</script>
<style lang="scss">
.upload-fullscreen-dialog {
  .el-dialog__body {
    padding: 0;
    height: calc(100% - 54px);
  }
  iframe {
    border: none;
  }
}
.disable-transition {
  .el-upload-list__item {
    transition: none !important;
  }
}
.limit-upload {
  .el-upload--picture-card {
    display: none;
  }
}
.upload {
  .el-upload-list--picture-card {
    > li {
      position: relative;
      .el-upload-list__slot {
        width: 100%;
        height: 100%;
      }
      .el-upload-list__item-thumbnail {
        object-fit: contain;
      }
      .el-upload-list__item-file-name {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
      }
    }
  }
  .disabled-upload {
    .el-upload-list__item-actions:hover {
      .el-upload-list__item-delete {
        display: none;
      }
    }
    .el-upload--picture-card {
      display: none;
    }
  }
}
.el-upload-list--picture-card .el-progress {
  width: auto;
}
</style>
