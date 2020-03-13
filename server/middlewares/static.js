// Copyright (c) 2019 Koa Static Contributors
// https://github.com/koajs/static/blob/master/LICENSE

'use strict'

/**
 * Module dependencies.
 */

const debug = require('debug')('koa-static')
const { resolve } = require('path')
const assert = require('assert')
const send = require('koa-send')

const defaultOpts = {
  maxAge: 365 * 24 * 60 * 60 * 1000
}

/**
 * Expose `serve()`.
 */

module.exports = serve

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 *        opts.maxAge {number}
 *        opts.prefix {string}
 * @return {Function}
 * @api public
 */

function serve (root, opts) {
  opts = Object.assign({}, opts)

  assert(root, 'root directory is required to serve files')

  // options
  debug('static "%s" %j', root, opts)
  opts.root = resolve(root)
  if (opts.index !== false) opts.index = opts.index || 'index.html'

  if (!opts.defer) {
    return async function serve (ctx, next) {
      let done = false

      if (ctx.path.startsWith(opts.prefix || '/') && (ctx.method === 'HEAD' || ctx.method === 'GET')) {
        try {
          ctx.set('cache-control', `public, max-age=${opts.maxAge || defaultOpts.maxAge}`);
          done = await send(ctx, ctx.path, opts)
        } catch (err) {
          if (err.status !== 404) {
            throw err
          }
        }
      }

      if (!done) {
        await next()
      }
    }
  }

  return async function serve (ctx, next) {
    await next()

    if (ctx.method !== 'HEAD' && ctx.method !== 'GET' && !ctx.path.startsWith(opts.prefix || '/')) return
    // response is already handled
    if (ctx.body != null || ctx.status !== 404) return // eslint-disable-line

    try {
      ctx.set('cache-control', `public, max-age=${opts.maxAge || defaultOpts.maxAge}`);
      await send(ctx, ctx.path, opts)
    } catch (err) {
      if (err.status !== 404) {
        throw err
      }
    }
  }
}