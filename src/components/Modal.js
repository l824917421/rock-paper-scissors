import Vue from 'vue'
import ConfirmModal from './Modal.vue'

const Modal = Vue.extend(ConfirmModal)

let instance1

let instance = new Modal()

instance.confirm = function (data) {
    instance1 = new Modal({
        data
    }).$mount()
    document.body.appendChild(instance1.$el)
    if (data) {
        instance1.show(data)
    }
    return instance1
}

instance.remove = function () {
    instance1.cancel()
}


export default {
    install: Vue => {
        Vue.prototype.$Modal = instance // 将Modal 组件暴露出去，并挂载在Vue的prototype上
        Vue.component("Modal", ConfirmModal)
    }
}