const User = require("./userModel")
const bcrypt = require('bcrypt');

class UserController{
    
    static login(req, res) {

        if (req.session.user) {
            
            res.redirect("/")

        } else {
            res.render("users/login");
        }
    }
    
    static async authentication(req, res) {
        const { email, password } = req.body;
    
        if (email && password) {
            const user = await User.findOne({ where: { email } });
    
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                };
                res.redirect("/");
            } else {
                const info = {
                    error: true,
                    msg: { title: "Não foi possível fazer login", 
                    body: "Credenciais inválidas!!" }
                };
                res.redirect(`/users/login?info=${JSON.stringify(info)}`);
            }
        } else {
            const info = {
                error: true,
                msg: { title: "Não foi possível fazer login", 
                body: "Por favor, preencha todos os campos do formulário!!" }
            };
            res.redirect(`/users/login?info=${JSON.stringify(info)}`);
        }
    }
    
    static new(req,res){
        
        if (req.session.user) {   
            res.redirect("/")

        } else {
            res.render("users/new");
        }
    }

    static logout(req,res){

        if(req.session.user){
            delete req.session.user
        }

        res.redirect("/users/login")

    }

    static async create(req,res){
        const {name,email,password,password2} = req.body

        if( name && email && password  && password2 && password == password2){
            
            const userExist =  await User.findOne({where: {email} })

            if (userExist == undefined ){
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password,salt)

                const user = await User.create({name, email, password:hash,isAdmin:false})

                req.session.user = {
                    id: user.id,
                    name: user.name,
                }

                res.redirect("/")

            }else{
                const info = {
                    error: true,
                    msg: { title: "Não foi possível concluir cadastro", 
                    body: "O e-mail digitado já foi cadastrado!!" }
                };
                res.redirect(`/users/new?info=${JSON.stringify(info)}`);
            }

        }else{
            const info = {
                error: true,
                msg: { title: "Não foi possível concluir cadastro",
                body: "Por favor, preencha todos os campos do formulário!!"}
            };
            res.redirect(`/users/new?info=${JSON.stringify(info)}`);
        }

    }

    static redefinePassword(req,res){

        res.render("users/redefinePassword", {userId:req.session.user.id})
    }

    static async updatePassword(req,res){
        const {id,password,newPassword,newPassword2} = req.body

        console.log(req.body)

        if( id && password && newPassword && newPassword2){
            
            const user =  await User.findOne({where: {id} })

            if (user.id == req.session.user.id && bcrypt.compareSync(password,user.password) && newPassword == newPassword2){
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(newPassword,salt)

                await User.update(
                    { password: hash },
                    { where: { id } }
                );

                res.redirect("/users/logout")
            }else{
                const info = {
                    error: true,
                    msg: { title: "Não foi possível redefinir senha", 
                    body: "dados invalidos!!" }
                };
                res.redirect(`/users/redefinePassword?info=${JSON.stringify(info)}`);
            }

        }else{
            const info = {
                error: true,
                msg: { title: "Não foi possível redefinir senha",
                body: "Por favor, preencha todos os campos do formulário!!" }
            };

            res.redirect(`/users/redefinePassword?info=${JSON.stringify(info)}`);
        }

    }
}

module.exports = UserController