const Discord = require('discord.js');

class discordBot {
    constructor(options) {
        this.client = new Discord.Client();
        this.token = options.token;
        this.isModerating = options.isModerating;
        this.isGreeting = options.isGreeting
        this.songs = options.songs;
        this.emotes = options.emotes;
        this.webhookOptions = {};
    };
    _greeting(member) {
        const channel = member.guild.channels.find((ch) => ch.name === this.isGreeting.channelName);
        if (!channel) return;

        channel.send(`${this.isGreeting.message} ${member}`);

    };
    _emoticons(message) {
        this.emotes.forEach((emote) => {
            console.log(message.content, emote.command);
            if (message.content === emote.command) {
                const attachment = new Discord.Attachment(emote.url);

                message.channel.send(attachment);
            };
        });
    };
    _moderate(message) {
        // <------- Kicking a user logic
        if (message.content.startsWith('!kick')) {
            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick(`Reasons`)
                        .then(() => {
                            message.reply(`Successfully kicked ${user.tag}`);
                        })
                        .catch(() => {
                            message.reply(`I was unable to kick them.`);
                        });
                } else {
                    message.reply(`That user isn't in the channel.`);
                };
            } else {
                message.reply(`You didn't mention a user to kick.`);
            };
        // ------->
        // <------- Banning a user logic
        } else if (message.content.startsWith('!ban')) {
            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick(`Reasons`)
                        .then(() => {
                            message.reply(`Successfully kicked ${user.tag}`)
                        })
                        .catch(() => {
                            message.reply(`I was unable to kick the member.`)
                        });
                } else {
                    message.reply(`That user isn't in the channel.`)
                };

            } else {
                message.reply(`You didn't mention a user to kick.`)
            };
        // ------->
        };
    };
    async _music(message) {
        if (message.content === '/join') {
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                    .then((connection) => {
                        message.reply('I have successfully joined the channel!');

                        let counter = 0;

                        while (counter < this.songs.length) {
                            dispatcher = connection.playArbitraryInput(this.songs[counter]);

                            dispatcher.on('end', () => {
                                counter++
                            });
                        };

                    })
                    .catch(console.log)
            } else {
                message.reply('You need to join a voice channel first.')
            };
        };
    };
    async start() {
        await this.client.login(this.token);
        console.log('Logged in!');

        this.client.on('message', (message) => {
            this.isModerating ? this._moderate(message) : null;
            this.songs ? this._music(message) : null;
            this.emotes ? this._emoticons(message, this.emotes) : null;
        });

        this.client.on('guildMemberAdd', (member) => {
            this.isGreeting.active ? this._greeting(member) : null;
        });
    };
};

module.exports = discordBot;