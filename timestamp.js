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
const OUTPUTS = [
  { suffix: 'F', id: 'discordFull', text: "discord full" },
  { suffix: 't', id: 'discordTime', text: "discord time" },
  { suffix: 'R', id: 'discordRelative', text: "discord relative" },
];

OUTPUTS.forEach(element => {
  let labelElement = document.createElement('label');
  let inputElement = document.createElement('input');

  labelElement.htmlFor = element.id;
  labelElement.innerText = element.text;

  inputElement.id = element.id;
  inputElement.type = 'text';
  inputElement.readOnly = true;

  outputFields.appendChild(labelElement);
  outputFields.appendChild(inputElement);
});

function humanTimeParse() {
  let humanTimeValue = humanTime.value;

  humanTimeValue = humanTimeValue.toLowerCase();
  humanTimeValue = humanTimeValue.replace(/\s+/mg, ' ');

  if (startsWithAny(humanTimeValue, MONTHS))
    parseAbsolute(humanTimeValue);
  else if (startsWithAny(humanTimeValue, WEEKDAYS))
    parseRelative(humanTimeValue);

  formattedTime.value = dayjsOutput.format("dddd, MMMM D, YYYY h:mm A");

  let unixTimestamp = dayjsOutput.unix();
  OUTPUTS.forEach(element => {
    document.getElementById(element.id).value = `<t:${unixTimestamp}:${element.suffix}>`;
  });
}

function startsWithAny(strString, aryArray) {
  return aryArray.some(strItem => strString.startsWith(strItem))
}

function parseAbsolute(humanTime) {
  let humanMonth = humanTime.substring(0, 3);
  humanMonth = MONTHS.indexOf(humanMonth);

  dayjsOutput = dayjs().month(humanMonth);

  let matchDate = humanTime.match(/(\d\d?)/);
  if (matchDate)
    dayjsOutput = dayjsOutput.date(matchDate[1]);

  if (dayjsOutput.isBefore(dayjs(), "day"))
    dayjsOutput = dayjsOutput.add(1, 'year');

  parseTime(humanTime);
}

function parseRelative(humanTime) {
  let humanWeekday = humanTime.substring(0, 2);
  humanWeekday = WEEKDAYS.indexOf(humanWeekday);

  if (dayjs().day() >= humanWeekday)
    humanWeekday += 7;

  dayjsOutput = dayjs().day(humanWeekday);

  parseTime(humanTime);
}

function parseTime(humanTime) {

  let matchTime = humanTime.match(/at (?<hour>\d\d?):?(?<minutes>\d\d)?\s?(?<meridian>p)?/);
  if (matchTime) {

    if (matchTime.groups.hour == "12")
      matchTime.groups.hour = "00";

    if (matchTime.groups.minutes == undefined)
      matchTime.groups.minutes = "00";

    dayjsOutput = dayjsOutput
                    .hour(matchTime.groups.hour)
                    .minute(matchTime.groups.minutes)
                    .second(0);

    if (matchTime.groups.meridian == "p")
      dayjsOutput = dayjsOutput.add(12, 'hours');

  }

}
