let bcrypt = require('bcrypt')
let User = require('../models/User')
let jwt = require('jsonwebtoken')

module.exports = function (express) {
  let router = express.Router()
  
  router.route('/') 
    // requires user. Adds post to req.user
    .get((req, res, next) => {
      // check auth
      if (!req.user) { return res.status(401).json({ error: 'Unauthorized' })}
      console.log(`[garden] GET /api/feed:`, req.user.username)
      User.findOne({username: req.params.username}, 'following', function (err, user) {
        if (err) {
          res.status(400).json({'error':err})
        } else {
          console.info('Found the user')
          if (!user) {
            return res.status(400).json({'error': 'no user found'})
          }
          res.status(200).json(user)
        }     
      })
    })
  return router
}