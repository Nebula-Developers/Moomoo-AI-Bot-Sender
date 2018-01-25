# Moomoo.io AI Bot Sender

This script is a very configurable botting tool for the MMO game [Moomoo.io](http://moomoo.io).

## Resources

* [Discord Server](https://discord.gg/Uj3GWPy)
* [Subreddit](https://reddit.com/r/Nebula_Devs)

## Installation

**NEW VIDEO INSTALLATION GUIDE:** https://www.youtube.com/watch?v=6QfVIt5V4oI

### Install Compilers to Make Follow Mouse Command Work (Optional)

If you have already installed the bot code, run `npm uninstall robotjs`.

#### Windows

Download and install Visual C++ Build Tools 2015 [here](http://landinghub.visualstudio.com/visual-cpp-build-tools).

Download and install Python 2.7.x [here](https://www.python.org/downloads/release/python-2714/).

Run the following commands in Command Prompt/Powershell:

  `npm config set python python2.7`
  
  `npm config set msvs_version 2015`
  
#### Mac OS X

Download and install Python 2.7.x [here](https://www.python.org/downloads/release/python-2714/) if it isn't already installed.

Download and install Xcode [here](https://developer.apple.com/xcode/download/).

#### Unix

You need Python 2.7.x and `make`.

Download and install [GCC](https://gcc.gnu.org/).

### Install the Bot Code (Required)

First, you must download and install Node.js: https://nodejs.org/en/

After Node.js is installed, run the below command in your console inside this folder. It is required to install important code the script depends on to run, and you can do that easily with the following command:

    `npm install`
    
Install a userscript manager:

Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

Firefox: [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/)

Safari: [Tampermonkey](http://tampermonkey.net/?browser=safari)

Microsoft Edge: [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s)

Opera: [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)


Put the code in showid.js into Tampermonkey so that your ID is visible.


Here is the start script:

    `node index.js [--probeTribe tribeName] [--probeName playerName] [--num numberOfBots] [--link moomooPartyLink] [--tribe tribeName] [--name botName] [--randnames true] [--chat chatMessage] [--ai true] [--autoHeal true]`
    
See the next section for information on everything after `node index.js`.

## Configuration

There are two main modes to this bot, probing and botting.

### Botting

Type "setowner \<your ID>" into the node.js console to make the bot obey your commands.

### Probing

`--probeTribe` searches all Moomoo.io servers for any tribes with the given name and returns the IPs so you can use them with --link.

`--probeName` does almost the same thing as --probeTribe, but searches the leaderboards for a player with the given name.

You can probe (search) for a name on the leaderboard or a tribe on all the public Moomoo.io servers. This is useful if you want to use the other part of this script to put bots on someone's livestream.

Here is the start script for probing using a tribe name:

    `node index.js --probeTribe Nebula`
    
This will return a list of server IPs which have the tribe `Nebula` in them.

Here is the start script for probing using a name on the leaderboard:

    node index.js --probeName Lucario
    
Similar to the other command, this will return a list of server IPs which have the player `Lucario` on the leaderboard.

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
