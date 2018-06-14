# Collections Search Updater

Boilerplate Serverless API that will be invoked by a Shopify webhook.

## Development 

### Tools
- Visual Studio Code
- AWS Cli tools - You'll need to configure your AWS access for the cli before you invoke any aws cli or serverless commands. Refer to [AWS documentation](http://docs.aws.amazon.com/cli/latest/userguide/awscli-install-windows.html) and run ```aws configre```
- Node v8.10
- Serverless -  `npm i -g serverless`

### Environment Variables
```
set region=ap-southeast-2
set stage=dev
set logLevel='debug'
set shopifySecret='[obtain from password state]'
```

### Local Deployment
To deploy from your local machine to AWS:
- ensure you are in ```ap-southeast-2``` (Sydney) region for ```dev```
- Ensure you have set your environment variables as above
- Ensure you have installed all of the node package dependencies via ```npm i```

To run serverless deployment:
```sh
sls deploy
```

To deploy a single task/function:
```sh
sls deploy -f functionName
```

To remove this deployment:
```sh
sls remove
```

### Api
This API is authenticated via a Hash (`Header[X-Shopify-Hmac-Sha256]`) check which is a combination of a shared secret key (between Shopify and the API) and the payload - represented as a sha1 encrypted value. If the authentication passes, the api will continue processing, if not it will return ```Forbidden 403```.

#### Response Status Codes
A `200` Ok `HTTP Status` response will be returned upon authentication passing.
A `403` Forbidden `HTTP Status` response will be returned upon authentication failing.
