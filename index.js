'use strict'

import crypto from "crypto";
import * as logger from './lib/logger';
import Utils from './lib/utils';

export function handler(event, context, callback) {
    const utils = new Utils();
    logDebugInfo(event);

    const buffer = (new Buffer(event.body, 'utf8'));
    const calculated_hash = crypto.createHmac("sha256", process.env.shopifySecret).update(buffer).digest("base64");

    //reject the message if the hash doesn't match
    if (!event.headers || event.headers["X-Shopify-Hmac-Sha256"] !== calculated_hash) {
        logger.error(`calculated_hash: (${calculated_hash}) != X-Shopify-Hmac-Sha256: (${event.headers["X-Shopify-Hmac-Sha256"]})`);
        callback(null, utils.formatResultBody(403, "Forbidden"));
    }
    else {
        //do something...
        callback(null, utils.formatResultBody(200, 'Ok'))
    }
}

const logDebugInfo = (event) => {
    if (event) {
        logger.debug(`Headers: ${JSON.stringify(event.headers)}`);
        logger.debug(`Event body: ${JSON.stringify(event.body)}`);
    }
}