const formatterToKiyvDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Kyiv",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formatterToKiyvTime = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Kyiv",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export const formatToKiyvDate = (isoString: Date | string) =>
  formatterToKiyvDate.format(new Date(isoString));

export const formatToKiyvTime = (isoString: Date | string) =>
  formatterToKiyvTime.format(new Date(isoString));
