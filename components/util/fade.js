import Vue from 'vue';

export default Vue.component('fade', {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'fade',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function (el) {
          console.log('fade in')
        },
        afterEnter: function (el) {
          console.log('fade entered')
        }
      }
    }
    return createElement('transition', data, context.children)
  }
})
