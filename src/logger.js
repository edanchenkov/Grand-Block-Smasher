import config from './config'

export default class Logger {
    static print(label, text) {
        if(config.logs) {
            console[label].apply(console, text);
        }
    }
}
