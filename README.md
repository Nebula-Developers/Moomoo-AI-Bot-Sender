# Moomoo.io AI Bot Sender

This script is a very configurable botting tool for the MMO game [Moomoo.io](http://moomoo.io).

### WARNING: Please do not download any code that claims that it will "fix" or "add features" to this bot code. People have been including trojans and viruses in those unofficial programs. The ONLY official Moomoo bot code authors are `Mega-Mewthree` and `Nebula-Developers`. DO NOT download any other code related to Moomoo bots.

We are not responsible for any damages caused by this project, or derivatives of this project. Use at your own risk.

## Resources

* [Discord](https://discord.gg/VgKFcVf)
* [Subreddit](https://reddit.com/r/Nebula_Devs)

For contributors: [To-Do List](https://github.com/Nebula-Developers/Moomoo-AI-Bot-Sender/projects/1)

## Installation

**NEW VIDEO INSTALLATION GUIDE:** https://www.youtube.com/watch?v=6QfVIt5V4oI

First, you must download and install Node.js: https://nodejs.org/en/

For all the Windows users who have no clue how to open a Command Prompt terminal/console, open `openCommandPrompt.bat`.

### Install Compilers to Make Follow Mouse Command Work (Optional)

If you have already installed the bot code, run `npm uninstall robotjs` in your console/terminal inside of the bot code's directory.

#### Windows

Download and install Visual C++ Build Tools 2015 [here](http://landinghub.visualstudio.com/visual-cpp-build-tools).

Download and install Python 2.7.x [here](https://www.python.org/downloads/release/python-2714/). Make sure you select the option to add it to PATH.

Run the following commands in your console (Command Prompt/Powershell):

    npm config set python python2.7
    npm config set msvs_version 2015

#### Mac OS X

Download and install Python 2.7.x [here](https://www.python.org/downloads/release/python-2714/) if it isn't already installed.

Download and install Xcode [here](https://developer.apple.com/xcode/download/).

#### Unix

You need Python 2.7.x and `make`.

Download and install GCC [here](https://gcc.gnu.org/).

#### All Systems

Run the following command in your console/terminal inside of the bot code's directory:

    npm install robotjs

### Install the Bot Code (Required)

After Node.js is installed, run the below command in your console inside this folder. It is required to install important code the script depends on to run, and you can do that easily with the following command:

    npm install

Or you can run `npminstall.bat` if you are on Windows and you have no clue how to get to a console.

Install a userscript manager:

Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

Firefox: [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/)

Safari: [Tampermonkey](http://tampermonkey.net/?browser=safari)

Microsoft Edge: [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s)

Opera: [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)


Put the code in showid.user.js into Tampermonkey so that your ID is visible.


Here is the start script:

    node index.js [--probeTribe tribeName] [--probeName playerName] [--num numberOfBots] [--link moomooPartyLink] [--tribe tribeName] [--name botName] [--randNames true] [--chat chatMessage] [--ai true] [--autoHeal true] [--randSkins true]

See the next section for information on everything after `node index.js`.

## Configuration

There are two main modes to this bot, probing and botting.

#### NEW: Open start.bat to get an easier to use UI! For people who can't use the command line very well! (Windows only)

### Botting

Type "setowner \<your ID>" into the node.js console to make the bot obey your commands.

`--num` sets the number of bots. Required for bots to function, and servers have their own limit of around 20 bots and users. Default: `0`

`--link` sets the Moomoo party link. Required for bots to function. Default: none

`--tribe` sets the Moomoo tribe. Default: none

`--name` sets the bots' names. Default: `unknown`

`--randNames` selects random names for the bots. Default: `false`

`--chat` sets the bots' chat message. Default: none

`--ai` enables using commands. If AI is not enabled, the bots spawn and do nothing. Default: `false`

`--autoHeal` enables auto healing. Default: `true`

`--randSkins` randomizes the skin color of bots. Default: `false`

`--hat` changes the hat via ID, name, or keyword, that will be bought/equipped when enough gold is reached. You can find each hat's ID online, and soon in the Tampermonkey script. Default: none

`--autoAttack` enables auto attack (as if they pressed E). Default: `true`

### Probing

`--probeTribe` searches all Moomoo.io servers for any tribes with the given name and returns the IPs so you can use them with --link.

`--probeName` does almost the same thing as --probeTribe, but searches the leaderboards for a player with the given name.

`--probeRegex` makes the arguments provided to the 2 previous probe flags be interpreted as a regular expression. Do not use flags in your regular expression. Note that the starting and ending slashes (`/`) are not required. It is suggested that you surround your search expression in quotation marks so that the terminal doesn't interpret special characters like `>` as command line operators. Default: `false`

You can probe (search) for a name on the leaderboard or a tribe on all the public Moomoo.io servers. This is useful if you want to use the other part of this script to put bots on someone's livestream.

Here is the start script for probing using a tribe name:

    node index.js --probeTribe Nebula

This will return a list of server IPs which have the tribe `Nebula` in them.

Here is the start script for probing using a name on the leaderboard:

    node index.js --probeName Lucario

Similar to the other command, this will return a list of server IPs which have the player `Lucario` on the leaderboard.

Here is an example of regular expression probing:

    node index.js --probeName "Luc" --probeRegex true

This will return all servers where someone whose name has the string `Luc` is on the leaderboard. For example, it will match `Luc`, `Luca`, `Lucario`, and `abcLucdef`. (But not `luc`.)

You can put both the outputs into `--link` for the botting start script.

## Console Commands

Type `setowner <your ID>` into the Node.js console to make the bot obey your ingame commands.

## Ingame Commands

Press R or click on the minimap to make a ping on the minimap, which makes the bots come to that pinged location.

!id \<player name>: Makes the bots send the ID of a player in chat.

!fme: Makes the bots follow you.

!fid \<player ID>: Makes the bots follow the player with that ID.

!atkid \<player ID>: Makes the bots attack the player with that ID. [BUGGY]

!s: Makes the bots stay.

!r: Releases the bots from control. Different from !s in that pressing R to ping will move them.

!fm: Makes the bots follow your mouse. May be buggy if the robot.js lib didn't compile correctly.

!hat \<hat ID>: Switches a bot's hat using the ID, name, or keyword. If necessary, the requested hat will be bot.

!atk: Toggles auto attack, as if the bots pressed E.
