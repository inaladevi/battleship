export const Ship = function(length) {
    return {
        length: length,
        hits: 0, 
        hit: function() {
            this.hits++
        },
        isSunk: function() {
            return this.hits >= this.length;
        }
    };
};