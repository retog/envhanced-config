export default function envhanced(config: string) {
  const json = config.replaceAll(regex, resolve);
  return JSON.parse(json);
}

const regex = /\$\{(.+)\}/ig;

function unBrace(expression: string) {
  return expression.match(/\$\{(.+)\}/)![1];
}

function resolve(expression: string) {
  const alts = unBrace(expression).split(":");
  const strRe = /str\((.*)\)/;
  const strMatch = alts[0].match(strRe);
  const varName = strMatch ? strMatch[1] : alts[0];
  const varValue = Deno.env.get(varName);
  const value = varValue ?? alts[1];
  return strMatch ? value ? `"${value}"` : "null" : value;
}
