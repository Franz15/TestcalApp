const { Schema, model } = require("mongoose");

var result = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  pesoCorp: {
    type: Number,
    required: true,
  },
  test1Peso: {
    type: Number,
    default: 0,
  },
  test1Porcent: {
    type: Number,
    default: 100,
  },
  test1Punt: {
    type: Number,
  },
  test2Peso: {
    type: Number,
    default: 0,
  },
  test2Porcent: {
    type: Number,
    default: 100,
  },
  test2Punt: {
    type: Number,
  },
  test3Tiempo: {
    type: Number,
    default: 0,
  },
  variante: {
    type: String,
  },
  test3Punt: {
    type: Number,
  },
  test4Tiempo: {
    type: Number,
    default: 0,
  },
  test4Punt: {
    type: Number,
  },
  gradoTeorico: {
    type: String,
  },
  _type: {
    type: String,
    default: "test9c",
  },
});

var maxReachDer = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  maxReachDer: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: "maxReachDer",
  },
});
var maxReachIzq = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  maxReachIzq: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: "maxReachIzq",
  },
});

var dobles = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  dobles: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: "dobles",
  },
});

var unoCincoNueve = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  cinco: {
    type: Number,
  },
  nueve: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: "159",
  },
});

var max20mm = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  max20mmPeso: {
    type: Number,
  },
  max20mmPorcent: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  pesoCorp: {
    type: Number,
    required: true,
  },
  _type: {
    type: String,
    default: "max20mm",
  },
});

var minEdge = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  minEdge: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: "minEdge",
  },
});

var bloqueoDer = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  bloqueoDer: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: "bloqueoDer",
  },
});
var bloqueoIzq = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  bloqueoIzq: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: "bloqueoIzq",
  },
});
var maxPesoDom = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  maxPesoDom: {
    type: Number,
  },
  maxPesoDomPorcent: {
    type: Number,
  },
  maxPesoDomDer: {
    type: Number,
  },
  maxPesoDomPorcentDer: {
    type: Number,
  },
  maxPesoDomIzq: {
    type: Number,
  },
  maxPesoDomPorcentIzq: {
    type: Number,
  },
  maxPesoDomMedia: {
    type: Number,
  },
  maxPesoDomPorcentMedia: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  pesoCorp: {
    type: Number,
    required: true,
  },
  _type: {
    type: String,
    default: "maxPesoDom",
  },
});

var maxNumDom = Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  maxNumDom: {
    type: Number,
  },
  maxNumDomDer: {
    type: Number,
  },
  maxNumDomIzq: {
    type: Number,
  },
  gradoDeclarado: {
    type: String,
    required: true,
  },
  pesoCorp: {
    type: Number,
    required: true,
  },
  _type: {
    type: String,
    default: "maxNumDom",
  },
});

const resultSchema = model("Result", result, "ResultadosTests");
const maxReachDerSchema = model("MaxReachDer", maxReachDer, "ResultadosTests");
const maxReachIzqSchema = model("MaxReachIzq", maxReachIzq, "ResultadosTests");
const doblesSchema = model("Dobles", dobles, "ResultadosTests");
const unoCincoNueveSchema = model(
  "UnoCincoNueve",
  unoCincoNueve,
  "ResultadosTests"
);
const max20mmSchema = model("Max20mm", max20mm, "ResultadosTests");
const minEdgeSchema = model("MinEdge", minEdge, "ResultadosTests");
const bloqueoDerSchema = model("BloqueoDer", bloqueoDer, "ResultadosTests");
const bloqueoIzqSchema = model("BloqueoIzq", bloqueoIzq, "ResultadosTests");
const maxPesoDomSchema = model("MaxPesoDom", maxPesoDom, "ResultadosTests");
const maxNumDomSchema = model("MaxNumDom", maxNumDom, "ResultadosTests");

module.exports = {
  Result: resultSchema,
  MaxReachDer: maxReachDerSchema,
  MaxReachIzq: maxReachIzqSchema,
  Dobles: doblesSchema,
  UnoCincoNueve: unoCincoNueveSchema,
  Max20mm: max20mmSchema,
  MinEdge: minEdgeSchema,
  BloqueoDer: bloqueoDerSchema,
  BloqueoIzq: bloqueoIzqSchema,
  MaxPesoDom: maxPesoDomSchema,
  MaxNumDom: maxNumDomSchema,
};
