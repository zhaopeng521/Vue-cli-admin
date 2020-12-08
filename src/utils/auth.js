import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function cookieData() {
  let cc = Cookies.get('cookieData')
  if(cc){
    cc = JSON.parse(cc);
  } else{
    cc=''
  }
  return cc;
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeCookieData() {
  Cookies.remove('cookieData')
  Cookies.remove('merchantNo')
}
