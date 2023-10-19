const validatePost = (req, res, next) =>{
    const errors = []
    const {title, category, cover, price, rate, author} = req.body;

    if (typeof title != 'string') {
        errors.push('titolo deve essere una stirna')
    }
    if (typeof category != 'string') {
        errors.push('category deve essere una stringa')
    }
    if (typeof cover != 'string') {
        errors.push('cover deve essere una stringa')
    }
    if (typeof price != 'number') {
        errors.push('price deve essere un numero')
    }
    if (typeof rate != 'number') {
        errors.push('rate deve essere una number')
    }
    if (typeof author != 'string') {
        errors.push('author deve essere una stringa')
    }
    if (errors.length > 0){
        res.status(400).send({errors})
    } else {
        next()
    }
}

module.exports = validatePost