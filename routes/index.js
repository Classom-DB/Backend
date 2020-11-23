import info from './user';
import login from './login';

module.exports = app => {
  app.use('/result', info)
  app.use('/login', login)
  
  app.use('*', (req, res, next) => {
    res.status(404)
    res.json({ "code": 404, "timestamp": new Date().getTime() })
  })

  app.use((err, req, res, next) => {
    res.status(404)
    res.json({ "code": 404, "timestamp": new Date().getTime() })
    console.log(err)
  })
};