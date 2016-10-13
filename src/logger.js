export default class Logger {
    static print(label, text) {
        console[label].apply(console, text);
    }
}
