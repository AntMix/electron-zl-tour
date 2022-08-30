// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const axios = require('axios');
const { shell } = require('electron')
const path = require('path');
const package = require(path.join(__dirname, '../package.json'))
const version = package.versionCode

// window.axiosTourBaseUrl = 'http://wx_tour.test.wifi100.com:8080/'
window.axiosTourBaseUrl  = 'https://local.zhonglian.com/';

axios.defaults.baseURL = window.axiosTourBaseUrl;

async function tourVersion() {
  await axios.get('api/tools/merchant/appVersion', { params: { version: version } }).then((result) => {
    let data = result.data.data
    if (result.data.code !== 0) {
      alert(result.data.msg)
      window.close()
    }
    if (data.need_update && data.update_url) {
      alert(`有新的更新，请前往下载安装：${data.update_url}`)
      shell.openExternal(data.update_url)
      setTimeout(() => {
        window.close()
      }, 1000);
    }
  }).catch((error) => {
    alert('网络异常')
    window.close()
  })
}
tourVersion()

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})




