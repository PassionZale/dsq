'use strict';

/**
 * release-log service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::release-log.release-log');
