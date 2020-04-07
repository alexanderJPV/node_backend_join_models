'use strict'

module.exports = (sequelize, Sequelize) => {
    const image = sequelize.define('image', {
        image: {
            type: Sequelize.STRING(255)
        },
        type: {
            type: Sequelize.STRING(255)
        },
        name: {
            type: Sequelize.STRING(255)
        }
    });
    return image;
}