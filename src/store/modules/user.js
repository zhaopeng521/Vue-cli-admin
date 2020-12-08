import { login, logout, getInfo } from '@/api/user'
import {userLogin,loginout} from '@/api/account.js';
import { getToken, setToken, removeToken ,removeCookieData,cookieData} from '@/utils/auth'
import router, { resetRouter } from '@/router'

import Cookies from 'js-cookie'


function getRoles(){
  let cJson = cookieData()
  let roles;
  try {
    if(cJson['tbl'][0]['siteType']==0){
      roles = ['admin'];
    } else {
      if(cJson['tbl'][0]['merchantNo']){
        roles = ['level2']
      }else{
        roles = []
      }
    }
    return roles;

  }catch(e) {
    // console.log(e,'eee')
  }

}
const state = {
  token: getToken(),
  cookieData:cookieData(),
  name: '',
  avatar: '',
  introduction: '',
  roles: getRoles() || []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_COOKIEDATA: (state, data) => {
    state.cookieData = data
  },
}

const actions = {
  // user login
  login({ commit ,dispatch}, userInfo) {
    const { username, password,source } = userInfo
    return new Promise((resolve, reject) => {
      userLogin({userName: username.trim(), userPwd: password,source:source }).then(response => {
        const { data } = response
        if(data.success){
          if(data.tbl[0].siteType == 0){
            resolve('0')
          }else{
            if(data.tbl[0].merchantNo){
              Cookies.set('merchantNo', data.tbl[0].merchantNo)
              resolve('1')
            } else {
              resolve('2')
            }
          }
          let token = data.token;
          Cookies.set('cookieData', data)
          commit('SET_COOKIEDATA', data)
          commit('SET_TOKEN', token)
          setToken(token)
        } else {
          resolve(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let roles = getRoles()||[];
      commit('SET_ROLES', roles)
      resolve(roles)

    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeCookieData()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
        loginout().then((res) => {
          console.log('loginout',res)
        }).catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {

      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])

      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    // resetRouter()

    // generate accessible routes map based on roles

    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    console.log(accessRoutes,'ddd',roles,'ggg')
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
