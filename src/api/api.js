import axios from 'axios'
const CancelToken = axios.CancelToken
let cancel = null
const musicApi = `${process.env.VUE_APP_BASE_API2}/yy/index.php?r=play/getdata`

export function getDate(url, init) {
    return axios({
        url: url,
        baseURL: process.env.VUE_APP_BASE_API1,
        params: {
            json: true,
            ...init
        }
    }).then((data) => {
        return data.data
    }).catch(err => {
        console.log(err)
    })
}
export function getSearchdate(url, init) {
    return axios({
        url: url,
        baseURL: process.env.VUE_APP_BASE_API3,
        params: {
            format: 'json',
            ...init
        }
    }).then(data => {
        return data.data
    }).catch(err => {
        console.log(err)
    })
}

export function getMusic(init) {
    cancel && cancel()
    return axios.get(musicApi, {
        params: {
            json: true,
            ...init
        },
        cancelToken: new CancelToken(function executor(c) {
            cancel = c
        })
    }).then((data) => {
        return data.data
    }).catch((error) => {
        console.log(error)
    })
}
