// services/api.js - handles api requests

const axios = require('axios')

const { serverUrl } = require('../../config')

module.exports = async (method, route, data) => {
  try {
    const res = await axios[method](serverUrl + route, data)

    return res.data
  } catch (error) {
    // error.response.data.erro
    const msg = error.response.data.error.message || error
    throw msg
  }
}
