'use strict';

export default class Utils {

    isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    formatResultBody(statusCode, message) {
        return {
            statusCode: statusCode,
            body: JSON.stringify({ message }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    }
}
