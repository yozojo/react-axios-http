export default {
  // demo
  get: {
    // get 默认
    url: `/projectManage/show`,
  },
  post: {
    // post
    url: `/projectManage/show`,
    method: 'post',
    // isFormData: true 默认false
    // 是否需要以formData形式传参
    // isQuery: true 默认false
    // post请求下，是否以url Query方式 ?pageNum=1&pageSize=10
  },
  put: {
    // put
    url: `/projectManage/show`,
    method: 'put',
    // isFormData: true 默认false
    // 是否需要以formData形式传参
    // isQuery: true 默认false
    // put请求下，是否以url Query方式 ?pageNum=1&pageSize=10
  },
  delete: {
    // delete
    url: `/projectManage/show`,
    method: 'delete',
  },
  getJsonp: {
    // jsonp
    url: `/projectManage/show`,
    method: 'getJsonp',
  },
};
