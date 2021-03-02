const { Comment, Image } = require('../models');
//Contar las imágenes
async function imageCounter(){
    return await Image.countDocuments();
}
//Contar los comentarios
async function commentsCounter() {
    return await Comment.countDocuments();
}
//Contar todas las vistas de las imágenes
async function imageTotalViewCounter() {
    const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}]);
    return result[0].viewsTotal;
}
//Contar los likes totales
async function likesTotalCounter() {
    const result = await Image.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}]);
    return result[0].likesTotal;
}

module.exports = async () => {
    //permite ejecutar las funciones sin que acabe la anterior y devuelve los resultados en un array
    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewCounter(),
        likesTotalCounter()
    ])

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }

}