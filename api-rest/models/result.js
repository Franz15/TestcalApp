const {Schema, model} = require ("mongoose");

const ResultSchema = Schema({
    fecha:{
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.ObjectId,
        ref: "User"
    },
    gradoDeclarado: {
        type: String,
        required: true
    },
    pesoCorp: {
        type: Number,
        required: true
    },
    test1Peso:{
        type: Number,
        default: 0
    },
    test1Porcent:{
        type: Number,
        default: 100
    },
    test1Punt:{
        type: Number,
    },
    test2Peso:{
        type: Number,
        default: 0
    },
    test2Porcent:{
        type: Number,
        default: 100
    },
    test2Punt:{
        type: Number,
    },
    test3Tiempo:{
        type: Number,
        default: 0
    },
    variante:{
        type: String,
    },
    test3Punt:{
        type: Number,
    },
    test4Tiempo:{
        type: Number,
        default: 0
    },
    test4Punt:{
        type: Number,
    },
    gradoTeorico:{
        type: String,
    }
});


module.exports = model ("Result", ResultSchema, "ResultadosTests");