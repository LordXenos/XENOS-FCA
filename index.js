/**
 * Xenos-Fca - Advanced Facebook Chat API for Node.js
 * 
 * @author XENOS
 * @repository https://github.com/LordXenos/XENOS-FCA.git
 * @github https://github.com/LordXenos
 * @license MIT
 */

"use strict";

const core = require('./src/core');
const Logger = require('./lib/utils/Logger');
const WebhookManager = require('./lib/utils/WebhookManager');
const PluginManager = require('./lib/utils/PluginManager');
const SessionValidator = require('./lib/auth/SessionValidator');
const ConnectionManager = require('./src/improvements/ConnectionManager');
const PerformanceOptimizer = require('./src/improvements/PerformanceOptimizer');
const errors = require('./lib/utils/errors');

function login(credentials, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  
  return core.login(credentials, options, callback);
}

module.exports = {
  login,
  Logger,
  WebhookManager,
  PluginManager,
  SessionValidator,
  ConnectionManager,
  PerformanceOptimizer,
  ...errors
};
