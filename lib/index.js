/**
 * Abandoning a package.
 * @module ape-abandoning
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get abandonProject () { return d(require('./abandon_project')) }
}
