const names = [
  "Jose", "Alicia", "Bruno", "Pia", "Carlos", "María", "Diego", "Sofía", 
  "Miguel", "Elena", "Andrés", "Carmen", "Roberto", "Ana", "Fernando", 
  "Lucía", "Gabriel", "Isabel", "Alejandro", "Valeria", "Ricardo", 
  "Natalia", "Sebastián", "Camila"
]

const lastNames = [
  "García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez",
  "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Muñoz",
  "Álvarez", "Romero", "Alonso", "Gutiérrez", "Elzo", "Torres", "Domínguez", "Vázquez"
]

const domains = ["yopmail.com", "mailinator.com", "tempmail.com", "emailfake.com", "dispostable.com"];


export function name(): string {
  return names[Math.floor(Math.random() * names.length)]
}

export function lastName(): string {
  return lastNames[Math.floor(Math.random() * lastNames.length)]
}

export function domain(): string {
  return domains[Math.floor(Math.random() * domains.length)] 
}

export function randomString(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function randomNumber(): number {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const firstDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
  let result = "";
  result += firstDigit[Math.floor(Math.random() * firstDigit.length)];
  for (let i = 0; i < 10; i++) {
    result += nums[Math.floor(Math.random() * nums.length)];
  }
  
  return parseInt(result);
}