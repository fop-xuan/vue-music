import Vue from 'vue'
import { createAPI } from 'cube-ui'
import zSongSheet from 'components/z-songSheet/z-songSheet'
import zSingers from 'components/z-singers/z-singers'
createAPI(Vue, zSongSheet)
createAPI(Vue, zSingers)
