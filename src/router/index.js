import Index from '@/container/Index'
import About from '@/container/About'
import Login from '@/container/Login'

const routes = [
  {
    path: "/",
    component: Index
  },{
    path: "/about",
    component: About
  },{
    path: "/login",
    component: Login
  }
];

export default routes