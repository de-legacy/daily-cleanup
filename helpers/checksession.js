function checkSession(req, res, next){
  if (req.session.loggedIn) {
    res.redirect('/user/list-workers')
  }else{
   	next()
  }
}

module.exports = checkSession