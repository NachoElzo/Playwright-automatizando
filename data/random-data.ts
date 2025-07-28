const cities = ["Santiago", "Zaragoza", "Puerto Varas", "Madrid", "Santiago Compostela", "New York"];

const countries = ["Chile", "Espana", "Usa", "Peru", "Italia", "Alemania"];

const names = [
  "Jose", "Alicia", "Bruno", "Pia", "Carlos", "Maria", "Diego", "Sofia", 
  "Miguel", "Elena", "Andres", "Carmen", "Roberto", "Ana", "Fernando", 
  "Lucia", "Gabriel", "Isabel", "Alejandro", "Valeria", "Ricardo", 
  "Natalia", "Sebastian", "Camila"
];

const lastNames = [
  "Garcia", "Rodriguez", "Gonzalez", "Fernandez", "Lopez", "Martinez", "Sanchez", "Perez",
  "Gomez", "Martin", "Jimenez", "Ruiz", "Hernandez", "Diaz", "Moreno", "Munoz",
  "Alvarez", "Romero", "Alonso", "Gutierrez", "Elzo", "Torres", "Dominguez", "Vazquez"
];

const domains = ["@yopmail.com", "@mailinator.com", "@tempmail.com", "@emailfake.com", "@dispostable.com"];

export function randomCountry (): string{
  return countries[Math.floor(Math.random() * countries.length)];
}

export function randomCity ():string{
  return cities[Math.floor(Math.random() * cities.length)];
}

export function randomName(): string {
  return names[Math.floor(Math.random() * names.length)];
}

export function randomLastName(): string {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

export function randomDomain(): string {
  return domains[Math.floor(Math.random() * domains.length)];
}

export function randomString(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function randomNumbers(): number {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const firstDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
  let result = "";
  result += firstDigit[Math.floor(Math.random() * firstDigit.length)];
  for (let i = 0; i < 10; i++) {
    result += nums[Math.floor(Math.random() * nums.length)];
  }
  
  return parseInt(result);
}

export function randomStringChars (){
  const chars = "0123456789%/#.:@|!a";
  let result = "";
  for (let i = 0; i < 5; i++){
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export const randomValues = {
  string : randomString(),
  numbers: randomNumbers(),
  numbersToString: randomNumbers().toString(),
  stringChars: randomStringChars()
};

export const randomInformation = {
  name: randomName(),
  lastName: randomLastName(),
  domain: randomDomain(),
  country: randomCountry(),
  city: randomCity(),
}