const express = require('express');
const path = require('path');
const exhdb = require('express-handlebars');
const users = require('./Users')
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.use('/api/users', require('./routes/api/users'))

//middleware
app.use(logger);

app.engine('handlebars', exhdb.engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars')


//homepage
app.get('/', (req, res) => {
    res.render('index', {
        title: 'User',
        users
});
})
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, 'public','index.html'));
// })
app.use(express.static(path.join(__dirname,'public')));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));


