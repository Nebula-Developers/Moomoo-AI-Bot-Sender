# Moomoo.io AI Bot Sender

~~This script is a very configurable botting tool for the MMO game [Moomoo.io](http://moomoo.io).~~

**Bot sending is no longer functional due to Moomoo.io's new IP limits. However, probing still works, so raid livestreams manually to your heart's content.**

### WARNING: Please do not download any code that claims that it will "fix" or "add features" to this bot code. People have been including trojans and viruses in those unofficial programs. The ONLY official Moomoo bot code authors are Mega-Mewthree and Nebula-Devs. DO NOT download any other code related to Moomoo bots.

We are not responsible for any damages caused by this project, or derivatives of this project. Use at your own risk.

## Resources

* [Discord](https://discord.gg/VgKFcVf)
* [Subreddit](https://reddit.com/r/Nebula_Devs)

For contributors: [To-Do List](https://github.com/Mega-Mewthree/Moomoo-AI-Bot-Sender/projects/1)

## Installation

**NEW VIDEO INSTALLATION GUIDE:** https://www.youtube.com/watch?v=6QfVIt5V4oI

First, you must download and install Node.js: https://nodejs.org/en/

For all the Windows users who have no clue how to open a Command Prompt terminal/console, open `openCommandPrompt.bat`.

### Install the Bot Code (Required)

After Node.js is installed, run the below command in your console inside this folder. It is required to install important code the script depends on to run, and you can do that easily with the following command:

    npm install

Or you can run `npminstall.bat` if you are on Windows and you have no clue how to get to a console.

Here is the start script:

    node index.js [--probeTribe tribeName] [--probeName playerName] [--probeRegex boolean]

See the next section for information on everything after `node index.js`.

## Configuration

~~There are two main modes to this bot, probing and botting.~~

**The script only has the probe function now.**

#### NEW: Open start.bat to get an easier to use UI! For people who can't use the command line very well! (Windows only)

### Probing

`--probeTribe` searches all Moomoo.io servers for any tribes with the given name and returns the IPs so you can use them with --link.

`--probeName` does almost the same thing as --probeTribe, but searches the leaderboards for a player with the given name.

`--probeRegex` makes the arguments provided to the 2 previous probe flags be interpreted as a regular expression. Do not use flags in your regular expression. Note that the starting and ending slashes (`/`) are not required. It is suggested that you surround your search expression in quotation marks so that the terminal doesn't interpret special characters like `>` as command line operators. Default: `false`

You can probe (search) for a name on the leaderboard or a tribe on all the public Moomoo.io servers. This is useful if you want to raid someone's livestream.

Here is the start script for probing using a tribe name:

    node index.js --probeTribe Nebula

This will return a list of server IPs which have the tribe `Nebula` in them.

Here is the start script for probing using a name on the leaderboard:

    node index.js --probeName Lucario

Similar to the other command, this will return a list of server IPs which have the player `Lucario` on the leaderboard.

Here is an example of regular expression probing:

    node index.js --probeName "Luc" --probeRegex true

This will return all servers where someone whose name has the string `Luc` is on the leaderboard. For example, it will match `Luc`, `Luca`, `Lucario`, and `abcLucdef`. (But not `luc`.)
