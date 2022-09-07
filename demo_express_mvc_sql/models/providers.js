pinosa
  17:01
const mongoose = require('mongoose');
/*
_id
company_name
CIF
address
url_web
*/
const objectSchema = {
    
    company_name: { 
        type: String, 
        required: true 
    },
    CIF: { 
        type: Number, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    url_web:{
        type: String,
        required: true
    },   
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    }
};
// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Provider = mongoose.model('Provider', providerSchema);
module.exports = Provider;

