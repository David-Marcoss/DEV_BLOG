
// define um dado global para verificar se usuario está logado
function isAuthenticated(req,res,next){

    if( req.session.user){
        
        res.locals.isAuthenticated = true

    }else{
        res.locals.isAuthenticated = false
    }

    next()

}


// verificar se usuario está logado 
function authorization(req,res,next){
    if( req.session.user){
       next()

    }else{
        res.redirect("/users/login")
    }
}

module.exports = {
    authorization,
    isAuthenticated
}