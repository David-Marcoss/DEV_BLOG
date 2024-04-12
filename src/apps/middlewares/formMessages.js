// Middleware para adicionar mensagens aos templates de formularios

function formMenssages(req, res, next) {
    res.locals.info = undefined;

    // Verifica se há mensagens na query da URL e adiciona ao contexto
    if (req.query.info) {
        res.locals.info = JSON.parse(req.query.info);
    }
    
    next();
}

module.exports = formMenssages