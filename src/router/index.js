import Login from '@/container/Login'
import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'
import Detail from '@/container/Detail'
import UserInfo from '@/container/UserInfo'
import Account from '@/container/Account'

const routes = [
  {
    path: "/login",
    component: Login
  },{
    path: "/",
    component: Home
  },{
    path: "/data",
    component: Data
  },{
    path: "/user",
    component: User
  },{
    path: "/userInfo",
    component: UserInfo
  },{
    path: "/detail",
    component: Detail
  },{
    path: "/account",
    component: Account
  }
];

export default routes