var dayjsToday = dayjs();
var dayjsOutput = dayjs();

humanTime.addEventListener("keyup", humanTimeParse);
humanTime.addEventListener("change", humanTimeParse);

outputFields.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "INPUT") {
    e.target.select();
    navigator.clipboard.writeText(e.target.value);
  }
});

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const WEEKDAYS = ["su", "mo", "tu", "we", "th", "fr", "sa"];
function humanTimeParse() {
  let humanTimeValue = humanTime.value;

  humanTimeValue = humanTimeValue.toLowerCase();
  humanTimeValue = humanTimeValue.replace(/\s+/mg, ' ');

  if (startsWithAny(humanTimeValue, MONTHS))
    parseAbsolute(humanTimeValue);
  else if (startsWithAny(humanTimeValue, WEEKDAYS))
    parseRelative(humanTimeValue);

  formattedTime.value = dayjsOutput.format("dddd, MMMM D, YYYY h:mm A");
  discordFull.value = "<t:" + dayjsOutput.unix() + ":F>";
  discordRelative.value = "<t:" + dayjsOutput.unix() + ":R>";
}

function startsWithAny(strString, aryArray) {
  return aryArray.some(strItem => strString.startsWith(strItem))
}

function parseAbsolute(humanTime) {
  let humanMonth = humanTime.substring(0, 3);
  humanMonth = MONTHS.indexOf(humanMonth);

  dayjsOutput = dayjsToday.month(humanMonth);

  let matchDate = humanTime.match(/(\d\d?)/);
  if (matchDate)
    dayjsOutput = dayjsOutput.date(matchDate[1]);

  if (dayjsOutput.isBefore(dayjsToday, "day"))
    dayjsOutput = dayjsOutput.add(1, 'year');

  parseTime(humanTime);
}

function parseRelative(humanTime) {
  let humanWeekday = humanTime.substring(0, 2);
  humanWeekday = WEEKDAYS.indexOf(humanWeekday);

  if (dayjsToday.day() >= humanWeekday)
    humanWeekday += 7;

  dayjsOutput = dayjsToday.day(humanWeekday);

  parseTime(humanTime);
}

function parseTime(humanTime) {

  let matchTime = humanTime.match(/at (\d\d?)/);
  if (matchTime) {
    matchTime.push("00");
    matchTimeMinutes = humanTime.match(/at (\d\d?):?(\d\d)/);

    if (matchTimeMinutes)
      matchTime = matchTimeMinutes;

    let matchPastMeridian = humanTime.match(/at (\d\d?):?(\d\d)?\s?(p)/);
    if (matchPastMeridian)
      matchTime[1] = 12 + parseInt(matchTime[1]);

    dayjsOutput = dayjsOutput.hour(matchTime[1]);
    dayjsOutput = dayjsOutput.minute(matchTime[2]);
    dayjsOutput = dayjsOutput.second(0);
  }
}
