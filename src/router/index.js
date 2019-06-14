const nav = [
    {
        path: '/',
        name: 'home',
        title: '新歌',
        component: () => import('views/home/home')
    },
    {
        path: '/rank/info/:id?',
        name: '/rank/info',
        title: '排行',
        component: () => import('views/rank/rank')
    },
    {
        path: '/plist/list/:id?',
        name: '/plist/list',
        title: '歌单',
        component: () => import('views/plistList/plistList')
    },
    {
        path: '/singer/class/:id?/:singerID?',
        name: '/singer/class',
        title: '歌手',
        component: () => import('views/singerClass/singerClass')
    }
]
export default nav
