# Moomoo.io AI Bot Sender

This script is a very configurable botting tool for the MMO game [Moomoo.io](http://moomoo.io).

## Resources

* [Discord server](https://discord.gg/Uj3GWPy)
* [Subreddit](https://reddit.com/r/Nebula_Devs)

Put the code in showid.js into Tampermonkey so that your ID is visible.

## Installation

**NEW VIDEO INSTALLATION GUIDE:** https://www.youtube.com/watch?v=6QfVIt5V4oI

First, you must download and install Node.js: https://nodejs.org/en/

After Node.js is installed, run the below command in your console inside this folder. It is required to install important code the script depends on to run:

    npm install

Here is the start script:

    node index.js [--probeTribe tribeName] [--probeName playerName] [--num numberOfBots] [--link moomooPartyLink] [--tribe tribeName] [--name botName] [--randnames true] [--chat chatMessage] [--ai true]`

`--probeTribe` searches all Moomoo.io servers for any tribes with the given name and returns the IPs so you can use them with --link.

`--probeName` does almost the same thing as --probeTribe, but searches the leaderboards for a player with the given name.

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
