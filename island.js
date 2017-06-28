m = module.exports = {
  Server: function() {
    this.registeredAccounts = [];
    this.createAccount = function(username, password) {
      var unameTaken = false;
      for (var i = 0; i<this.registeredAccounts.length; i++) {
        if (this.registeredAccounts[i].username == username) {
          console.log("Username is taken");
          unameTaken = true;
        }
      }
      if (!unameTaken) {
        this.registeredAccounts.push(new m.Account(username, password));
        return true;
      }
      else {
        return false;
      }
    };
    this.authenticate = function(username, password) {
      var account = null;
      for (var i = 0; i < this.registeredAccounts.length; i++) {
        if (this.registeredAccounts[i].username == username) {
          account = this.registeredAccounts[i];
          console.log('reee');
          break;
        }
      }
      if (account == null) {
        return false;
      }
      else {
        if (account.password == password) {
          return true;
        }
        return false;
      }
    };
  },

  Account: function(username, password) {
    this.username = username;
    this.password = password;
  }
};
