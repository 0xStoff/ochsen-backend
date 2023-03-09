'use strict';

/**
 * contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact',{

  async find(ctx) {
    const entries = await strapi.entityService.findMany('api::contact.contact', {
      populate: 'picture'
    });
    const {title, name, street, postal, phone, picture} = entries;

      return {
        title,
        name,
        street,
        postal,
        phone,
        picture
      };
  },
});
