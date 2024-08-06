'use strict';

/**
 * dingding-robot service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dingding-robot.dingding-robot');
