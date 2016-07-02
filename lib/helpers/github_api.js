/**
 * @class GithubAPI
 */
'use strict'

const request = require('request')

/** @lends GithubAPI */
class GithubAPI {
  constructor (accessToken) {
    const s = this
    s.accessToken = accessToken
  }

  request (config) {
    return new Promise((resolve, reject) =>
      request(config, (err, res, body) =>
        err ? reject(err) : resolve(Object.assign(res, { body }))
      )
    )
  }

  updateRepo (repo, data) {
    const s = this
    return s.request({
      method: 'PATCH',
      url: `https://api.github.com/repos/${repo}?access_token=${s.accessToken}`,
      headers: {
        'User-Agent': 'ape-abandoning'
      },
      json: true,
      body: data
    })
  }

}

module.exports = GithubAPI
