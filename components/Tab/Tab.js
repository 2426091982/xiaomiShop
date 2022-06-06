// components/Tab/Tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击了其他选项
    handleActive(e) {
      const activeIndex = e.currentTarget.dataset.i;
      this.triggerEvent('activeChange',{activeIndex});
    }
  }
})
