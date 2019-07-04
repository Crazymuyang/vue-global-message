/**
 * 全局消息组件
 * @param {Object} options { zindex: 1000, duration: 1500 } 
 */
import GlobalMessage from './GlobalMessage'

const Message = {}
Message.install = function (Vue, options) {
  const MessageConstructor = Vue.extend(GlobalMessage)
  const instance = new MessageConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  let defaultOptions = {
    'zindex': 1000,
    'duration': 1500
  }
  if(Object.prototype.toString.call(options) === '[object Object]') {
    defaultOptions = mergeOpt(options, defaultOptions)
  }
  instance.zindex = defaultOptions.zindex;
  instance.duration = defaultOptions.duration;
  
  Vue.prototype.$message = {
    info(content) {
      instance.currentMsg = { type: 'info', content, }
    },
    success(content) {
      instance.currentMsg = { type: 'success', content, }
    },
    warn(content) {
      instance.currentMsg = { type: 'warn', content, }
    },
    error(content) {
      instance.currentMsg = { type: 'error', content, }
    },
  }
}

function mergeOpt(opt,def) {
  for (var key in def) {
    def[key] = opt[key]
  }
  return def
}

export default Message
