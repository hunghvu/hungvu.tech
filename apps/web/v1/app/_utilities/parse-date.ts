

/**
 * Author: Hung Vu
 *
 * Parse a UTC timestamp to local date.
 * The format is based on Day JS rules.
 *
 * Timezone is based on the context of where the function is called.
 * Generally, it resides in "use client" component so the function
 * can access user local timezone.
 */

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// TODO: handle errors
const utcToLocal = (date: string, dayjsFormat: string): string => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const userTimeZone = dayjs.tz.guess();
  return dayjs.utc(date).tz(userTimeZone).format(dayjsFormat);
};

export { utcToLocal };
