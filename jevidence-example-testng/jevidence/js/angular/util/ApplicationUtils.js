String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
};

if(!String.prototype.startsWith){
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
}