const { defineConfig } = require('@vue/cli-service')
module.exports = {
  css:{
    loaderOptions: {
      sass: {
        additionalData: `@import "./assets/scss/shared.scss";`,
      },
    },
  },
};
