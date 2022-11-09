// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  setInterval(() => {
    document.querySelectorAll('div').forEach((item) => {
      if (item.className.indexOf('user-info') !== -1) {
        item.remove()
      }
    })
    if (window.location.hostname + window.location.pathname === 'life.douyin.com/p/login') {
      window.close()
    }
  }, 100)
  
  setInterval(() => {
    alert('登录信息过期，请重新登录');
    window.close()
  }, 3600 * 1000 * 24 * 3)
})




