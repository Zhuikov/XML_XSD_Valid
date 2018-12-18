### *the best xsd/xml validator ever...*

---

### What is it?
This service will tell you, is XML matches to XSD scheme or not.

### Run it

To build and run docker with service use in its directory:

```
[sudo] npm run docker:build
[sudo] npm run docker:run
```

It will start docker container. 
So you can use your 80 port to connect to service.

### Example
To use service you should make POST-request with 2 files.

The first file is XSD-schema. The second file is XML for validating:
```
curl -X POST -H "Content-Type: text/xml" -d @test.xsd  -d @true.xml  localhost:80
```
(Here is three files in root directory for example using).

Response:
* `200` and "VALID" -- if XML-file matches for XSD-schema
* `200` and "INVALID" -- if XML-file doesn't match for XSD-schema
* `400` if any errors.
