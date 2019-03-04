import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import routes from './routes';

/**
 * Express app setup
 */
const app = express();

// view engine
app.set('views', path.join(__dirname, './views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', routes);

// set static resources
const options = {
  dotfiles: 'ignore',
  etag: false,
  maxage: '24h',
  index: false,
};
app.use(express.static(path.join(__dirname, './public'), options));

app.use((req, res) => {
  res.status('404');
  res.render('404');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
  next();
});

export default app;
