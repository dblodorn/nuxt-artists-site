import Vue from 'vue'

import RawDisplayer from '~/components/util/RawDisplayer'
import LazyImage from '~/components/LazyImage'
import LoadImage from '~/components/LoadImage'
import ViewportWrapper from '~/components/ViewportWrapper'
import CloseIcon from '~/components/ui/CloseIcon'
import fade from '~/components/util/fade'

Vue.component('raw-displayer', RawDisplayer)
Vue.component('lazy-image', LazyImage)
Vue.component('load-image', LoadImage)
Vue.component('viewport-wrapper', ViewportWrapper)
Vue.component('close-icon', CloseIcon)
