const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export function toReadableDateString(date: string) {
  return dateFormatter.format(new Date(date));
}
