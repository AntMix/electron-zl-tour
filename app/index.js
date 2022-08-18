const { createApp } = require('vue')
const ElementPlus = require('element-plus')
const { ElMessage, ElLoading} = require('element-plus')
const { clipboard } = require('electron')
const axios = require('axios')

axios.defaults.baseURL = window.axiosTourBaseUrl;

let lastCode = ''

const vueApp = createApp({
    data() {
        return {
            submitText: '提交',
            code: ''
        }
    },
    computed: {
        isAbleSubmit() {
            if (this.code) {
                return true
            }
            return false
        }
    },
    methods: {
        formSubmit() {
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading'
            })
            axios.post('api/tools/merchant/gotoAdmin', { code: this.code }).then((result) => {
                loading.close()
                this.code = ''
                let data = result.data.data
                this.merchantCodeInterval()
                if (result.data.code !== 0) {
                    ElMessage.error(result.data.msg)
                    return
                }
                window.open(data.url)
            }).catch((err) => {
                loading.close()
            });
        },
        merchantCodeInterval() {
            let interval = setInterval(() => {
                let text = clipboard.readText()
                if (text.length === 32 && lastCode !== text) {
                    this.code = text
                    lastCode = text
                    ElMessage.success('已自动填充商户编码')
                    this.formSubmit()
                    clearInterval(interval)
                }
            }, 1000);
        }
    }
}).use(ElementPlus).mount('#vueApp')

vueApp.merchantCodeInterval()
