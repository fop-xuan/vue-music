import axios from 'axios'
import jsonp from 'jsonp'

export function getDate(url, init) {
    return axios({
        url: url,
        baseURL: '/api',
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
        baseURL: '/search',
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

function getParms(init) {
    let str = ''
    for (let attr in init) {
        str += attr + '=' + init[attr]
    }
    return str
}
export function getMusic(init) {
    const url = `https://wwwapi.kugou.com/yy/index.php?r=play/getdata&${getParms(init)}`
    return new Promise((resolve, reject) => {
        jsonp(url, null, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}
