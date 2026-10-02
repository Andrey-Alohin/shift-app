function getInitials(str: string): string {
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);
}

export default getInitials;
