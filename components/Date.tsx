import moment from "moment";

export function toReadableDateString(date: string) {
  const pattern = "MMMM Do YYYY, h:mm:ss a"; // July 19th 2020, 6:48:08 pm
  return moment(date, "YYYY-MM-DDTHH:mm:ss.SSS").format(pattern);
}
