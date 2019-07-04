<style lang="scss" scoped>
  p { margin: 0; padding: 0;}
  .msg-box {
    position: fixed;
    z-index: 1000;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    .msg-item {
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 0 30px;
      border-radius: 2px;
      box-shadow: 0 2px 10px 0 rgba(114,114,114,0.3);
      background: #fff;
      min-width: 150px;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      font-size: 14px;
      .msg-icon {
        width: 18px; height: 18px;
        display: block;
        margin-right: 5px;
      }
    }
  }

  .msg-box-m {
    position: fixed;
    z-index: 1000;
    top: 2%;
    right: 2%;
    .msg-item {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: #555;
      white-space: nowrap;
      border-radius: 24px;
      background: #fff;
      border: 2px solid rgb(216, 214, 214);
      box-shadow: 0 0 20px 0px rgba(0,0,0,0.1);
      padding: 6px 20px;
      margin-bottom: 4px;
      .msg-content {
        letter-spacing: 1px;
        white-space: nowrap;
      }
      .msg-icon {
        display: block; 
        width: 18px; height: 18px;
        margin-right: 4px;
      }
    }
  }

  .list-complete-item {
    display: inline-block;
  }
  .list-complete-enter-active, 
  .list-complete-leave-active, 
  .list-complete-move {
    transition: all .5s;
  }
  .list-complete-enter {
    opacity: .2;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  .list-complete-leave-to {
    opacity: .1;
  }
  
</style>

<template>
  <div class="msg-box" :style="containerSty" v-if="!isMobile">
    <transition-group name="list-complete" tag="div">
      <div class="msg-item" v-for="item of msgList" :key="item.id">
        <img class="msg-icon" :src="item.icon">
        <p class="msg-content">{{item.content}}</p>
      </div>
    </transition-group>
  </div>
  <div class="msg-box-m" :style="containerSty" v-else>
    <transition-group name="list-complete" tag="div">
      <div class="msg-item" v-for="item of msgList" :key="item.id">
        <img class="msg-icon" :src="item.icon">
        <p class="msg-content">{{item.content}}</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
/**
 * 全局消息组件
 */
import successIcon from '@/assets/baseicon-success.png'
import errorIcon from '@/assets/baseicon-fail.png'
import warnIcon from '@/assets/baseicon-warn.png'
import infoIcon from '@/assets/baseicon-info.png'

import { setTimeout } from 'timers'
function checkEnv(ua) {
  if (ua.match(/wxwork/i) == 'wxwork') {
    return 'wxwork'
  } else if (ua.match(/MicroMessenger/i) == 'MicroMessenger') {
    return 'micromessenger'
  } else if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
    return 'android'
  } else if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return 'ios'
  } else {
    return 'pc'
  }
}
export default {
  name: 'BaseGlobalMsg',
  data() {
    return {
      currentMsg: {},
      msgList: [],
      duration: 1500,
      isInterval: false,
      isMobile: false,
      zindex: 1000,
    }
  },
  watch: {
    currentMsg(val) {
      this.msgListRender(this.currentMsg)
    }
  },
  computed: {
    containerSty() {
      return {
        'z-index': this.zindex
      }
    }
  },
  mounted() {
    this.isMobile = checkEnv(navigator.userAgent) === 'pc' ? false : true
  },
  methods: {
    msgListRender: function(obj) {
      if(typeof obj !== 'object') return
      const tempId = new Date().getTime()
      const iconType = obj.type
      const content = obj.content
      const isCheckOne = obj.checkone

      let icon = ''
      switch(iconType) {
        case 'success':
          icon = successIcon
          break 
        case 'warn':
          icon = warnIcon
          break
        case 'info':
          icon = infoIcon
          break
        case 'error':
          icon = errorIcon
          break
        default:
          icon = tipsIcon
      }
      const newMsg = {
        id: tempId,
        icon,
        iconType,
        content
      };

      this.msgList.push(newMsg)
      this.msgInterval()
    },
    msgInterval: function() {
      if(this.msgList.length === 0 || this.isInterval) {
        return
      }
      
      this.isInterval = true
      this.interval = setInterval(() => {
        if(this.msgList.length === 1) {
          this.msgList.shift()
          clearInterval(this.interval);
          this.isInterval = false
        }else if(this.msgList.length > 0) {
          this.msgList.shift()
        }else {
          clearInterval(this.interval)
          this.isInterval = false
        }
      }, this.duration)
    },
  }
}
</script>
