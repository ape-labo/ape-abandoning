#!/usr/bin/env node
/**
 * Abandon the project
 */
'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const apeAbandoning = require('../lib')

apeTasking.runTasks('abandon', [
  () => apeAbandoning.abandonProject()
], true)
