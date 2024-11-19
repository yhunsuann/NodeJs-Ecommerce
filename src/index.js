const express = require('express');
const { PrismaClient } = require('./generated/client');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api', require('./router/admin/api'));
app.use('/api', require('./router/client/api'));

app.get('/', (req, res) => {
 res.send('Hello World');
});


app.listen(3000, () => {
 console.log('Server is running on port 3000');
});
