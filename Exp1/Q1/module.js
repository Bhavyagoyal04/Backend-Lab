const mod = {
    user: {
        name: "Bhavya",
        id: 500122949
    },
    hello : function() {
        return `Hello from ${this.user.name}`;
    }
}
module.exports = mod;