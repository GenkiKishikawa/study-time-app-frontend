export const dateFormater = (date: string): string => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = d.getMonth() + 1; // getMonth() は 0 から始まるため +1 する
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();

  // 数値を2桁の文字列に変換する関数
  const pad = (num: number) => num < 10 ? '0' + num : num.toString();

  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`;
}

export const minutesFormatter = (minutes: number): string => {
  // 数値を2桁の文字列にフォーマットする補助関数
  const pad = (num: number): string => num < 10 ? '0' + num : num.toString();

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${pad(hours)}:${pad(remainingMinutes)}`;
}

export const hourToMinutes = (hour: string) => {
  const [hours, minutes] = hour.split(':');
  return Number(hours) * 60 + Number(minutes);
}
