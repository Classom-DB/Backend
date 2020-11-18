import info from './user';

module.exports = app => {
  app.use('/result', info)

  app.use('*', (req, res, next) => {
    res.json({ "code": "400", "timestamp": new Date().getTime() })
  })

  app.use((err, req, res, next) => {
    res.status(404)
    res.json({ "code": "404", "timestamp": new Date().getTime() })
    console.log(err)
  })
};