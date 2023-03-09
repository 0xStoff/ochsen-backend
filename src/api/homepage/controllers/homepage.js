'use strict';

/**
 * homepage controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::homepage.homepage', {

    async find() {
        const entries = await strapi.entityService.findMany('api::homepage.homepage', {
            fields: ['title', 'claim', 'event', 'caption'],
            populate: {
                logo_positiv: {
                    fields: ['url', 'alternativeText']
                },
                logo_negativ: {
                    fields: ['url', 'alternativeText']
                }
            },
        });

        const { logo_positiv, logo_negativ, ...filteredEntries } = entries;
        return {
            ...filteredEntries,
            logo: {
                url: {
                    light: logo_negativ?.url ?? null,
                    dark: logo_positiv?.url ?? null,
                },
                alternativeText: {
                    light: logo_positiv?.alternativeText ?? logo_negativ?.alternativeText,
                    dark: logo_negativ?.alternativeText ?? logo_positiv?.alternativeText,
                },
            }
        }
    },
});
