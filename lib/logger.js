'use strict';

const levels = { error : 5, warn : 4, info : 3, debug : 2 };

export const info = (message, variable) => log('info', message, variable)
export const warn = (message, variable) => log('warn', message, variable)
export const error = (message, variable) => log('error', message, variable)
export const debug = (message, variable) => log('debug', message, variable)

const log = (level, message, variable) => {
    if (levels[level] >=  getLogLevel()) {
        if (variable) {
            console.log(`${level} - ${message}: ${JSON.stringify(variable)}`);
        } else {
            console.log(`${level} - ${message}`);
        }
    }
}

export const getLogLevel = () => {
    let loggingLevel = levels[process.env.logLevel];
    
    if (!loggingLevel) {
        console.log('setting default logging level to [debug] as there is no valid logging level configured');
        loggingLevel = levels['debug'] //default
    }

    return loggingLevel;
}