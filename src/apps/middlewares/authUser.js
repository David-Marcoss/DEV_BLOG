
// define um dado global para verificar se usuario está logado
function isAuthenticated(req,res,next){

    if( req.session.user){
        
        res.locals.isAuthenticated = true
        res.locals.isAdmin = req.session.user.isAdmin

    }else{
        res.locals.isAuthenticated = false
    }

    next()

}

// permite acesso a view apenas para usuarios admin
function isAdmin(req,res,next){

    if( req.session.user && req.session.user.isAdmin ){
        next()

    }else if (req.session.user){
        res.redirect("/")
    }else{
        res.redirect("/users/login")
    }

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
    isAdmin,
    isAuthenticated
}