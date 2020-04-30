// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, id, email, user) {
        super(name,id,email,"Engineer");
        this.github = user;
    }
    getRole() {
        return this.role;
    }
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;