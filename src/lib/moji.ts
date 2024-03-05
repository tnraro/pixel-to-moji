export const dataToMoji = (data: number[][]) => {
  return data
    .map((row) =>
      row.map((dot) => String.fromCodePoint(10240 + dot)).join(""),
    )
    .join("\n");
};

export const mojiToData = (string: string) => {
  if (/^\s$/.test(string)) {
    return 0;
  }
  if (/^[⠀-⣿]$/.test(string)) {
    return string.codePointAt(0)! - 10240;
  }
  return 0;
}