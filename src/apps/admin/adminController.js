
class AdminController{

    static index(req,res){

        if (req.session.user && req.session.user.isAdmin) {   
            res.render("admin/index")

        }else if (req.session.user) {
            res.redirect("/");
        }else{
            res.redirect("/users/login");
        }
    }


}

module.exports = AdminController