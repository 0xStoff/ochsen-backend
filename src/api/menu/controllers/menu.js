// api/menu/controllers/menu.js

'use strict';

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::menu.menu', {
  async find(ctx) {

    const entries = await strapi.entityService.findMany('api::menu.menu', {
      fields: ['id', 'course', 'side', 'price'],
      publicationState: 'live',
      populate: {
        category: {
          fields: ['name']
        }
      },
    });


    return entries.reduce((result, entry) => {
      const categoryName = entry.category ? entry.category.name : null;

      if (!result[categoryName]) {
        result[categoryName] = [];
      }

      result[categoryName].push(entry);

      return result;
    }, {});

  },
});
