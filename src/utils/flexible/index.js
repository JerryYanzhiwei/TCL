(function (doc, win) {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth > 1920) {
      docEl.style.fontSize = Math.floor(100 * (clientWidth / 1920)) + 'px'
    } else {
      docEl.style.fontSize = Math.floor(100 * (clientWidth / 1920)) + 'px'
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
