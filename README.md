# human date/time to discord timestamp

Input a date and time using natural language, get Discord timestamps.

## Usage

Simply enter a day and time using natural language. The script will try its very best to parse your input and give you [Discord timestamps](https://gist.github.com/LeviSnoot/d9147767abeef2f770e9ddcd91eb85aa).

Examples:

- Sunday at 10 AM
- October 12 at 1:15 pm
- jan 1 *(current time assumed)*
- tomorrow at 5 *(AM assumed)*
- fri at 3p
- today at 6:45a

There's [quite a few of these scripts out there](https://duckduckgo.com/?q=discord+timestamps), but I wanted something where I didn't have to click around to choose a day/time. Typing it out is just faster and more natural.

## Limitations

The script tries to be very clever, but in reality it only parses these formats:

- [weekday] at [time]
- [month day] at [time]
- [today] at [time]
- at [time] (uses today's date)

The input format is very US-centric, but the resulting timestamp will render in the user's locale on Discord.

## Credits

Many thanks to these awesome projects:

- [awsm.css](https://igoradamenko.github.io/awsm.css/index.html)
- [Day.js](https://day.js.org/en/)
- [Icon](https://thenounproject.com/icon/clock-5223444/) by [Husali](https://husali.com/) via the [Noun Project](https://thenounproject.com/)
