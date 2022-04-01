const sitespeed_helper = require('../helpers/sitespeed_helper')


module.exports = async function(context, commands) {
    // Navigate to a URL, but do not measure the URL
    // we fetch the selenium webdriver from context
    const webdriver = context.selenium.webdriver;
    const driver = context.selenium.driver;
    const email = sitespeed_helper.getEmail();

    try {

        // start measuring name page
        await commands.measure.start('https://doppio-leads-staging.int.payoff.com/apply/prequal/name', 'Name Page');
        //enter name
        await commands.addText.bySelector('TROY', '#firstName');
        await commands.addText.bySelector('MCGINNIS', '#lastName');

        await commands.wait.bySelector('#btnSubmit', 5000);

        //start measuring Birthday Page after clicking continue
        await commands.measure.start("Birthday Page");
        await commands.click.bySelectorAndWait('#btnSubmit');
        await commands.wait.bySelector('#birthday', 5000);
        //stop measuring after the page has completed loading.
        await commands.measure.stop();

        //now wait for birth date text box to load  and enter date
        await commands.wait.byTime(5000);
        await commands.addText.bySelector('09/01/1986','#birthday');
        await commands.wait.byTime(5000);
        //start measuring Zipcode Page after clicking continue
        await commands.measure.start("Address Page");
        await commands.click.bySelectorAndWait('#btnSubmit');
        //stop measuring after the page has completed loading.
        await commands.measure.stop();

        //enter address info
        await commands.wait.bySelector('#zip', 5000);
        await commands.addText.bySelector('30064','#zip');
        await commands.wait.bySelector('#root > main > form > div > div > div.slide1 > div:nth-child(2) > button', 5000);
        await commands.click.bySelector('#root > main > form > div > div > div.slide1 > div:nth-child(2) > button');
        await commands.wait.bySelector('#address1', 5000);
        await commands.addText.bySelector('2418 ALEXANDER LAKE','#address1');
        await commands.wait.byTime(5000);

       const adressbox = await driver.findElement(webdriver.By.css('#address1'));
       await adressbox.sendKeys(webdriver.Key.ENTER);

       // await commands.click.bySelectorAndWait('#suggestion-dropdown');
        await commands.wait.byTime(2000);
        await commands.wait.bySelector('#btnSubmit', 5000);
        await commands.click.bySelector('#btnSubmit');
        await commands.wait.bySelector('.mb-2', 5000);
        await commands.wait.bySelector('#btnSubmit', 5000);

        //start measuring Phone Page after clicking continue
        await commands.measure.start("Phone Number Page");
        await commands.click.bySelector('#btnSubmit');
        //stop measuring after the page has completed loading.
        await commands.wait.byPageToComplete();
        await commands.measure.stop();
        //enter phone
        await commands.wait.bySelector('input[id=phone]', 5000);
        await commands.addText.bySelector('9998909092','input[id=phone]');
        await commands.wait.bySelector('#btnSubmit', 5000);
        await commands.wait.byTime(1000);
        //submit and measure
        await commands.measure.start("Income Page");
        await commands.click.bySelector('#btnSubmit');
        //stop measuring after the page has completed loading.
        await commands.wait.byPageToComplete();
        await commands.measure.stop();

        //enter income
        await commands.wait.bySelector('input[id=income]', 5000);
        await commands.addText.bySelector('1000000','input[id=income]');
        await commands.wait.bySelector('#btnSubmit', 5000);
        //submit and measure
        await commands.measure.start("Monthly Rent Page");
        await commands.click.bySelectorAndWait('#btnSubmit');
        await commands.measure.stop();

        //enter rent
        await commands.wait.bySelector('#housingPayment', 5000);
        await commands.addText.bySelector('800','#housingPayment');
        await commands.wait.bySelector('#btnSubmit', 5000);
        //submit and measure
        await commands.measure.start("Account Page");
        await commands.click.bySelectorAndWait('#btnSubmit');
        await commands.measure.stop();

        //enter email and password
        await commands.wait.bySelector('#email', 5000);
        await commands.addText.bySelector(email,'#email');
        await commands.addText.bySelector(email,'#emailConfirm');
        await commands.addText.bySelector('givemeoffer$123','#password');
        await commands.click.bySelector('label[for=disclosure_chk]');
        await commands.wait.bySelector('#btnSubmit', 5000);
        await commands.wait.byTime(2000);

        //submit and measure
        await commands.measure.start("Loan Amount Page");
        await commands.click.bySelector('#btnSubmit');
        await commands.wait.bySelector('#amount', 30000);
        await commands.wait.byPageToComplete();
        await commands.measure.stop();

        await commands.addText.bySelector('5000','#amount');
        await commands.wait.bySelector('#btnSubmit', 5000);
        await commands.wait.byTime(2000);
        //submit and measure
        await commands.measure.start("Offer Page");
        await commands.click.bySelector('#btnSubmit');
        await commands.wait.bySelector('#amount_select', 30000);
        await commands.wait.byPageToComplete();

        await commands.measure.stop();




    } catch (e) {
        throw e;
    }
};