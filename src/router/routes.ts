//import HomeView from '../views/home/index.vue'
import View404 from '../views/404/index.vue'
import Login from '../views/login/index.vue'
import HomeView from '../layout/index.vue'

export const constantRoute = [
    { 
      path: '/', 
      component: HomeView, 
      name:'layout',
      redirect: '/home',
      meta: {
        title: "",
        hidden: false,
        icon: 'HomeFilled'
      },
      children: [
        { 
          path: '/home', 
          component: () => import('../views/home/index.vue'), 
          name:'home',
          meta: {
            title: "首页",
            hidden: false,
            icon: "HomeFilled",
          }
        },
      ] 
    },

    { 
      path: '/404', 
      component: View404, 
      name:'404',
      meta: {
        title: "404",
        hidden: true
      }
    },

    { 
      path: '/login', 
      component: Login, 
      name:"login",
      meta: {
        title: "登陆",
        hidden: true
      }
    },

    
    {
      path: '/screen',
      component: () => import('../views/screen/index.vue'),
      name: 'screen',
      meta: {
        title: "数据大屏",
        hidden: false,
        icon: 'Platform',
      }
    },

    {
      path: '/acl',
      component: () => import('../layout/index.vue'),
      name: 'Acl',
      meta: {
        title: "权限管理",
        hidden: false,
        icon: 'Lock',
      },
      children: [
        {
          path: '/user',
          component: () => import('../views/acl/user/index.vue'),
          name: 'User',
          meta: {
            title: '用户管理',
            hidden: false,
            icon: 'User',
          }
        },

        {
          path: '/role',
          component: () => import('../views/acl/role/index.vue'),
          name: 'Role',
          meta: {
            title: '角色管理',
            hidden :false,
            icon: 'UserFilled'
          }
        },

        {
          path: '/permisson',
          component: () => import('../views/acl/permission/index.vue'),
          name: 'Permisson',
          meta: {
            title: "菜单管理",
            hidden: false,
            icon: 'Monitor',
          }
        }
      ]
    },

    {
      path: '/product',
      name: 'Product',
      component: () => import('../layout/index.vue'),
      meta: {
        title: "商品管理",
        hidden: false,
        icon: 'Goods',
      },
      children: [
        {
          path: '/product/trademark',
          name: 'Trademark',
          component: () => import('../views/product/trademark/index.vue'),
          meta: {
            title: '品牌管理',
            hidden: false,
            icon: "ShoppingCartFull"
          }
        },

        {
          path: '/product/attr',
          name: 'Attr',
          component: () => import('../views/product/attr/index.vue'),
          meta: {
            title: '属性管理',
            icon: "ChromeFilled"
          }
        },

        {
          path: '/product/spu',
          name: 'Spu',
          component: () => import('../views/product/spu/index.vue'),
          meta: {
            title: 'spu管理',
            icon: "Calendar"
          }
        },

        {
          path: '/product/sku',
          name: 'Sku',
          component: () => import('../views/product/sku/index.vue'),
          meta: {
            title: 'sku管理',
            hidden: false,
            icon: "Orange"
          }
        }
      ]
    },

    { 
      path: '/:pathMatch(.*)*', 
      redirect:"/404", 
      name:"any",
      meta: {
        title: "任意路由",
        hidden: true
      }
    },

  ]