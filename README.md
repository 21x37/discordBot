# @21x37/discord-bot
Easily setup a discord bot with this npm module! 🕹️

# Install
```
npm install @21x37/discord-bot
```

# Usage
```js
const discordBot = require('@21x37/discord-bot');

const options ={
    token: 
    isModerating,
    isGreeting,
    emotes
};
```
### Token is the discord token received from https://discordapp.com/developers/applications
```js
const token = process.env.DISCORD_TOKEN
```

### isModerating is a boolean, true or false. If you want the bot to have !kick and !ban commands.
```js
const isModerating = true;
```
In discord
```
!kick @username
```

### isGreeting is a object with possibly three properties.
* Boolean is if the greeting is active or not.
* Message is the message you want displayed when a person joins the channel. The username if the new user will immediately be added to the end of the string.
* Channel is the channel name of where you want the greeting to be.

```js
const isGreeting = { boolean: true, message: 'Welcome!', 'general' };
```
### Emotes is an ARRAY of objects where each object will have the command and a url to the image.

```js
const emotes = [
  { command: '!foo', url: 'https://www.bar.com/thevalueofbar.jpg' }
]
```
### To start the bot.
```js
const bot = new discordBot(options);
bot.start();
```

# Example

```js
const discordBot = require('@21x37/discord-bot');

const options = {
    token: process.env.DISCORD_TOKEN,
    isModerating: true,
    isGreeting: { active: true, message: 'Welcome to our server!', channelName: 'general' },
    emotes: [{ command: '!pepeHands', url: 'https://i.kym-cdn.com/entries/icons/original/000/025/382/Screen_Shot_2018-02-06_at_3.37.14_PM.png' }],
}

const bot = new discordBot(options);

bot.start();
```
Then just node your file in the cli.
```
node discordBot.js
```
