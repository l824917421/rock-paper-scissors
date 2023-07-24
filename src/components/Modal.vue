<template>
  <div v-if="visibleModal">
    <div class="modal-mask"></div>
    <div class="modal-wrap" @click.self="maskClick">
      <div class="modal" :style="{ width: width + 'px' || 'auto' }">
        <div class="modal-content">
          <div class="modal-close" @click="cancel">
            <img src="@/assets/svg/close.svg" />
          </div>
          <div class="modal-header">
            <div class="modal-title">{{ title2 || title }}</div>
          </div>
          <slot>{{ content }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  model: {
    prop: "visible",
    event: "visibleChange",
  },
  props: {
    width: {
      type: Number,
    },
    title: {
      type: String,
      default: "标题",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    maskClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title2: "",
      visibleModal: false,
      loading: false,
      content: "",
      subFunc: null,
      cancelFunc: null,
    };
  },
  watch: {
    visible(newV) {
      this.visibleModal = newV;
    },
  },
  methods: {
    open() {
      this.visibleModal = true;
      this.$emit("visibleChange", true);
    },
    cancel() {
      this.visibleModal = false;
      this.$emit("visibleChange", false);
    },
    //函数打开
    show(data) {
      const { title, content, subFunc, cancelFunc } = data;
      this.visibleModal = true;
      this.title2 = title;
      this.content = content;
      this.subFunc = subFunc;
      this.cancelFunc = cancelFunc;
    },
    onSubmit() {
      this.subFunc.call();
    },
    maskClick() {
      if (!this.maskClose) return;
      this.cancel();
    },
  },
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  inset-inline-end: 0;
  bottom: 0;
  inset-inline-start: 0;
  z-index: 1000;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.45); */
}
.modal-wrap {
  position: fixed;
  top: 0;
  inset-inline-end: 0;
  bottom: 0;
  inset-inline-start: 0;
  overflow: auto;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  z-index: 1000;
}
.modal {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  color: #ccc;
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  pointer-events: none;
  position: relative;
  top: 100px;
  max-width: calc(100vw - 16px);
  padding-bottom: 12px;
}
.modal > .modal-content {
  position: relative;
  background-color: #ffffff;
  background-clip: padding-box;
  border: 0.5px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: auto;
  background-color: #1e1e1e;
  padding: 10px 12px;
}
.modal > .modal-content .modal-close {
  position: absolute;
  top: 7px;
  inset-inline-end: 7px;
  z-index: 1010;
  padding: 2px;
  color: #ccc;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  background: transparent;
  border-radius: 2px;
  width: 14px;
  height: 14px;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}
.modal > .modal-content .modal-close:hover {
  background-color: #434343;
  text-decoration: none;
}
.modal .modal-close img {
  height: 1em;
}
.modal .modal-header {
  color: #ccc;
  background: #1e1e1e;
  border-radius: 8px 8px 0 0;
  margin-bottom: 8px;
}
.modal .modal-title {
  margin: 0;
  color: #ccc;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}
</style>