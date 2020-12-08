import router,{ asyncRoutes, constantRoutes ,regRouter,resetRouter} from '@/router'
import Cookies from 'js-cookie'
import {deepClone} from '@/utils'
let cookieData = Cookies.get('cookieData');



function routerCookie() {
  if(!cookieData) return '';
  let routerArr;
  let cJson = JSON.parse(cookieData);
  let deepArr = deepClone(constantRoutes);
  let roles;
  if(cJson['tbl'][0]['siteType']==0){
    roles = ['admin'];
  } else {
    if(cJson['tbl'][0]['merchantNo']){
      roles = ['level2']
    }else{
      roles = []
    }
  }
  if(roles.length == 0){
    routerArr = [];
  } else {
    routerArr = filterAsyncRoutes(deepArr,roles)
  }
  return routerArr;
}

function routerFilter(deepArr) {
  let arr = [];
  deepArr.forEach(el=>{
    if(!el.hidden){
      let arrChild = el.children.filter(v=>{
        return !v.meta.roles || !v.meta.roles.includes('admin');

      })
      el.children = arrChild;
      arr.push(el);
    }
  })
  return arr;

}
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  constantRoutes:routerCookie()
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  GET_ROUTES:(state, routes) => {
    state.constantRoutes = routes
  },
  GET_D:(state, routes) => {
    state.constantRoutes = regRouter
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes

      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  getUserRouter({ commit },r){
    let deepArr = deepClone(constantRoutes);
    // if(r==0){
    //   commit('GET_ROUTES',deepArr)
    //
    // } else{
    //   if(r==1){
    //     let arr = routerFilter(deepArr);
    //
    //     commit('GET_ROUTES',arr)
    //
    //   }else{
    //     commit('GET_ROUTES',[])
    //   }
    // }
    if(r.length == 0){
      commit('GET_ROUTES',[])
    } else {
      let arr = filterAsyncRoutes(deepArr,r)
      commit('GET_ROUTES',arr)
    }

  },
  getUserRouter3({ commit }){
    commit('GET_D')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
