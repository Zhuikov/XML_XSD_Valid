var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

/** For parsing request bodies in a middleware before handler */
var bodyParser = require('body-parser');

/** Using XML-XSD validator in project */
var libxml = require('libxmljs');

/** create http server */
var app = express();

/** set logger for http server */
app.use(logger('dev'));

/** set middleware function for parsing */
app.use(bodyParser.text({type: 'text/xml'}));

/** set handler for incoming request */
app.use('/', handler);

/**
 * Main handler for POST request. Split request's body by '&'-symbol.
 * Body should consist of two files:
 *      the first file is XSD-schema,
 *      the second one is XML-file.
 * Returns 200 and "VALID" if XML-file matches for XSD-schema;
 * 200 and "INVALID" if XML-file doesn't match for XSD-schema;
 * 400 if error input.
 *
 * @param req -- request object
 * @param res -- response object
 * @param next -- next middleware function.
 */
function handler(req, res, next) {

    try {
        let s = req.body.split("&");
        const xsdString = s[0];
        const xmlString = s[1];
        const xsdDoc = libxml.parseXml(xsdString);
        const xmlDoc = libxml.parseXml(xmlString);
        const result = xmlDoc.validate(xsdDoc);
        res.status(200).send(result ? "VALID\n" : "INVALID\n");

    } catch (e) {
        console.log("Exception");
        res.status(400).send(e.message);
    }
}

module.exports = app;
