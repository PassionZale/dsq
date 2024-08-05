'use strict';

/**
 * release-log router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::release-log.release-log');
