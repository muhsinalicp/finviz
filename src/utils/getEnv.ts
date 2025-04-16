export function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not defined in environment`);
  return value;
}
