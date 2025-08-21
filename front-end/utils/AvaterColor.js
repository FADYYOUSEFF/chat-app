const colors = [
  "#FF5733",
  "#33B5FF",
  "#33FF57",
  "#FFC300",
  "#9B59B6",
  "#FF8C00",
  "#00CED1",
  "#E91E63",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function getAvatarColor(username) {
  const hash = Math.abs(hashString(username));
  return colors[hash % colors.length];
}
