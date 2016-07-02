/**
 * @function abandonProject
 * @param {Object} [options]
 */
'use strict'

const GithubAPI = require('./helpers/github_api')
const path = require('path')
const assert = require('assert')
const execcli = require('execcli')
const co = require('co')
const writeout = require('writeout')

/** @lends abandonProject */
function abandonProject (options = {}) {
  const { GITHUB_ACCESS_TOKEN } = process.env
  assert.ok(GITHUB_ACCESS_TOKEN, 'process.env.GITHUB_ACCESS_TOKEN is required.')
  let pkgPath = path.resolve(options.pkgPath || 'package.json')
  let description = options.description || '!!NO LONGER_MAINTAINED'
  let api = new GithubAPI(GITHUB_ACCESS_TOKEN)
  return co(function * () {
    let here = process.cwd()
    process.chdir(path.dirname(require.resolve(pkgPath)))
    let { name, repository } = require(pkgPath)

    console.log(`Update repository description: "${description}"`)
    yield api.updateRepo(repository, {
      name: repository.split(/\//g).pop(),
      description
    })

    console.log('Update README')
    yield writeout('README.md', `## ${description}`, { force: true })

    console.log('Deprecate npm package')
    yield execcli('npm', [ 'deprecate', name, `"${description}"` ])

    process.chdir(here)
  })
}

module.exports = abandonProject
