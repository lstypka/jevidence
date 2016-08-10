String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
};

if(!String.prototype.startsWith){
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
}

function randomId() {
   function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   }
   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};