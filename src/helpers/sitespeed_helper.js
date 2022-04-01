var faker = require('faker');

module.exports = {

    continueandstop: async function (commands) {
        await commands.click.bySelector('#btnSubmit');
        await commands.wait.byPageToComplete();
        await commands.measure.stop();

    },

   getEmail: function () {
        var fakeemail = Date.now() + "_" + faker.internet.email().split('@');
        return fakeemail.replace(/\,.*/, '@happymoney.com');
    }
}