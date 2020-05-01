class Question {
    constructor (type,name,message) {
this.type = type;
this.name = name;
this.message = message;
let standardValidation = (input) => {
    if (input === "") {
        return "Must be answered";
    } 
    return true;
};
let typeValidation = (input) => {
    if (input === "") {
        return "Must be answered";
    } else {
        if (input.toLowerCase() !== "manager" && input.toLowerCase() !== "engineer" && input.toLowerCase() !== "intern") {
            return "Must be either Manager, Engineer or Intern"
        } else {
            return true;
        }
    }

};
if (this.name === "employeeType") {
    this.validate = typeValidation;
} else {
this.validate = standardValidation;
}
    }
}
module.exports = Question;

