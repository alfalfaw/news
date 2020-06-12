import request from '../utils/request'

// 获取用户资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/users'
  })
}

// 更新用户头像
export const updateUserPhoto = data => {
  return request({
    method: 'POST',
    url: '/users/upload',
    data
  })
}
