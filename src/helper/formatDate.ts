import dayjs from "dayjs";

function formatDate(date: string | number | Date | dayjs.Dayjs | null | undefined) {
  return dayjs(date).format("MM/DD/YYYY");
}

function formatDaysAgo(date: string | number | Date | dayjs.Dayjs | null | undefined) {
  const daysAgo = dayjs().diff(date, "day");
  return `${daysAgo} days ago`;
}

export { formatDate, formatDaysAgo };

