function CASE() {}

String.prototype.format = function() {
    var a = 0;
    while (a < arguments.length && this.search("{}") != -1) {
        this.replace("\{\}", arguments[a++])
    }
    return this;
}