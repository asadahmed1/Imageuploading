var mongoose = require('mongoose')

const photoUploading = mongoose.Schema({
    photo_name:{
    type:String
},
    photo_path:{
        type:String
    }
})
module.exports = mongoose.model('photoUploading',photoUploading)