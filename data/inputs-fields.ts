// We are using template literals (backticks or ``) to preserve the string formatting,
export const titles = {
  titleText: "inputs-fields",
  headerText: "Inputs Practice",
  subTitleText: `Fill out the form below and click "Send" to add the data to the grid.
All fields must be completed to send the form.`,
};

const placeHolderPrefix = "Enter your"
const lettersErrorPrefix = "must contain only letters."

export const formElements = {
  labels: [
    "Name",
    "Last Name",
    "Age",
    "Email",
    "Phone",
    "Country",
    "City",
    "Delete by ID:"
  ],
  
  placeHolders:[
    `${placeHolderPrefix} name`,
    `${placeHolderPrefix} last name`,
    `${placeHolderPrefix} age`,
    `${placeHolderPrefix} email`,
    `${placeHolderPrefix} phone number`,
    `${placeHolderPrefix} country`,
    `${placeHolderPrefix} city`,
  ],
  errorLabels: {
    name: `Name ${lettersErrorPrefix}`,
    lastName : `Last Name ${lettersErrorPrefix}`,
    age: `Age must be between 1 and 150.`,
    email: `Invalid email address.`,
    phone1: `Phone must be between 9 and 12 digits.`,
    phone2: `Phone must contain only numbers.`,
    country: `Country ${lettersErrorPrefix}`,
    city: `City ${lettersErrorPrefix}`
  }

}