class Question {
  constructor(type, name, message) {
    this.type = type;
    this.name = name;
    this.message = message;
    let standardValidation = (input) => {
      if (input === "") {
        return "Must be answered";
      }
      if (name !== "employeeEmail") {
        if (/^[a-zA-Z0-9- ]*$/.test(input) == false) {
          return "Must not include special characters";
        }
      }
      return true;
    };
    let typeValidation = (input) => {
      if (input === "") {
        return "Must be answered";
      } else {
        if (
          input.toLowerCase() !== "engineer" &&
          input.toLowerCase() !== "intern"
        ) {
          return "Must be either an Engineer or Intern";
        } else {
          return true;
        }
      }
    };
    if (this.name === "employeeTypeQ") {
      this.validate = typeValidation;
    } else {
      this.validate = standardValidation;
    }
  }
}
module.exports = Question;
