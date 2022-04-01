module.exports = async function(context, commands) {
    // Navigate to a URL, but do not measure the URL
    await commands.navigate(
        'https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Main+Page'
    );

    try {
        // Add text into an input field, finding the field by id
        await commands.addText.byId('login', 'wpName1');
        await commands.addText.byId('password', 'wpPassword1');

        // Start the measurement and give it the alias login
        // The alias will be used when the metrics is sent to
        // Graphite/InfluxDB
        await commands.measure.start('login');

        // Find the submit button and click it and wait for the
        // page complete check to finish on the next loaded URL
        await commands.click.byIdAndWait('wpLoginAttempt');
        // Stop and collect the metrics
        return commands.measure.stop();
    } catch (e) {
        // We try/catch so we will catch if the the input fields can't be found
        // The error is automatically logged in Browsertime an rethrown here
        // We could have an alternative flow ...
        // else we can just let it cascade since it caught later on and reported in
        // the HTML
        throw e;
    }
};