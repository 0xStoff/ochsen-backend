'use strict';

/**
 * homepage controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::homepage.homepage', {

    async find(ctx) {
        return await strapi.entityService.findMany('api::homepage.homepage', {
            fields: ['title', 'claim', 'event', 'caption'],
            populate: {
                logo_positiv: {
                    fields: 'url'
                },
                logo_negativ: {
                    fields: 'url'
                }
            },
        });
    },
});
