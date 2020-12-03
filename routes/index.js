import login from './login';
import guest from './guest';
import employee from './employee';
import reserve from './reserve';
import claim from './claim';
import roomservice from './roomservice';
import parking from './parking';
import department from './department';
import income from './income';
import expense from './expense';
import clean from './clean';
import room from './room';
import checkout from './checkout';
import planning from './planning';



module.exports = app => {
  app.use('/login', login)
  app.use('/guest', guest)
  app.use('/employee', employee)
  app.use('/reserve', reserve)
  app.use('/claim', claim)
  app.use('/roomservice', roomservice)
  app.use('/parking', parking)
  app.use('/department', department)
  app.use('/income', income)
  app.use('/expense', expense)
  app.use('/clean', clean)
  app.use('/room', room)
  app.use('/checkout', checkout)
  app.use('/planning', planning)


  
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