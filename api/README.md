ce-store.github.io
==================

# API Documentation

The API documentation is generated using [Swagger](https://swagger.io) and the [Swagger UI](https://github.com/swagger-api/swagger-ui/).

It is written in YAML format and maintained at https://github.com/ce-store/ce-store.github.io/blob/master/api/ce-swagger.yaml

## Build

The build process consists of using the standard Swagger UI and bundling the CE Store API docs into it.  The standard Swagger UI comes pre-built (see the `dist` directory) when the repository is cloned and so it's simple to add docs to it.

To build:

1. the YAML must be exported as JSON (which can be done with tools such as the [Swagger Editor](https://swagger.io/swagger-editor/) or [SwggerHub](https://swaggerhub.com/)).  Export a file called `ce-swagger.json`.

2. Wrap the JSON as a JavaScript variable with the file name `ce-swagger.js` by adding a variable name at the top of the file

  ```JavaScript
var spec =
{
    // REMAINING CONTENT OF ce-swagger.json goes here
}
```

3. Edit `dist/index.html` to import the `ce-swagger.js` file created in step 2 above

  ```JavaScript
<script src='ce-swagger.js' type="text/javascript"></script>
```

4. Edit `dist/index.html` to include the spec variable (see ADD THIS LINE comment below)

  ```JavaScript
  // Build a system
  const ui = SwaggerUIBundle({
    spec: spec, // ADD THIS LINE
    url: "http://petstore.swagger.io/v2/swagger.json",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });
```

5. Make any other tweaks or visual alterations you require

6. Point a web browser at `dist/index.html` and you should now see the docs being rendered.
