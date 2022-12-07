//An alternative to running the code below

const http   = require('http');

const server = http.createServer();

server.listen(3000);

//instead of the above you can run the code below it replaces that above

app.listen(3000)

//replace the below 

res.sendFile(path.join(__dirname,'../', 'views', 'add-product.html')); 

//with ||------->

const rootDir = require('../utils/path');

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});


//for rendering dynamic templates for templating engines such as pug, handle-bars and ejs
//you can use the below synthax

//change ---> 

res.sendFile(path.join(rootDir, 'views', 'shop.html'));

//to -->

res.render('shop')

//where shop is the name of the file for the templating engine>>>


