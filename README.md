# Moomoo.io AI Bot Sender

This script is a very configurable botting tool for the MMO game [Moomoo.io](http://moomoo.io).

## Resources

* [Discord server](https://discord.gg/Uj3GWPy)
* [Subreddit](https://reddit.com/r/Nebula_Devs)

Put the code in showid.js into Tampermonkey so that your ID is visible.

## Installation

**NEW VIDEO INSTALLATION GUIDE:** https://www.youtube.com/watch?v=6QfVIt5V4oI

First, you must download and install Node.js: https://nodejs.org/en/

After Node.js is installed, run the below command in your console inside this folder. It is required to install important code the script depends on to run, and you can do that easily with the following command:

    npm install
    
Here is the start script:

    node index.js [--probeTribe tribeName] [--probeName playerName] [--num numberOfBots] [--link moomooPartyLink] [--tribe tribeName] [--name botName] [--randnames true] [--chat chatMessage] [--ai true]`
    
See the next section for information on everything after `node index.js`.

## Configuration

There are two main modes to this bot, probing and botting.

### Botting

This section is WIP.

### Probing

In short:

`--probeTribe` searches all Moomoo.io servers for any tribes with the given name and returns the IPs so you can use them with --link.

`--probeName` does almost the same thing as --probeTribe, but searches the leaderboards for a player with the given name.

You can probe (search) for a name on the leaderboard or a tribe on all the public Moomoo.io servers. This is useful if you want to use the other part of this script to put bots on someone's livestream.

Here is the start script for probing using a tribe name:

    node index.js --probeTribe Nebula
    
This will return a list of server IPs which have the tribe `Nebula` in them.

Here is the start script for probing using a name on the leaderboard:

    node index.js --probeName Lucario
    
Similar to the other command, this will return a list of server IPs which have the player `Lucario` on the leaderboard.

You can feed both the outputs into `--link` for the botting start script.

## Console Commands

Type `setowner <your ID>` into the Node.js console to make the bot obey your commands.

## Ingame Commands

Press R or click on the minimap to make a ping on the minimap, which makes the bots come to that pinged location.

!id \<player name>: Makes the bots send the ID of a player in chat.
  
!fme: Makes the bots follow you.

!fid \<player ID>: Makes the bots follow the player with that ID.
  
!atkid \<player ID>: Makes the bots attack the player with that ID. [BUGGY]
  
!s: Makes the bots stay.

!r: Releases the bots from control. Different from !s in that pressing R to ping will move them.

!fm: Makes the bots follow your mouse. May be buggy if the robot.js lib didn't compile correctly.
