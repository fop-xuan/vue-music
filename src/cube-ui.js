import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Button,
  // form
  Input,
  Picker,
  // popup
  // scroll
  Scroll,
  Slide
} from 'cube-ui'
Vue.use(Picker)
Vue.use(Button)
Vue.use(Input)
Vue.use(Scroll)
Vue.use(Slide)
