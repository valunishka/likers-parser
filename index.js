let express = require('express');
let app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(`${__dirname}/dist`));

app.get('/', (request, response) => {
	response.sendfile(`${__dirname}/dist/index.html`);
});

app.listen(app.get('port'), () => {
  console.log(`Node app is running at localhost: ${app.get('port')}``);
});
