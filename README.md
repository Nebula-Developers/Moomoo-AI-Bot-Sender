# Moomoo-AI-Bot-Sender

Join Nebula here: https://discord.gg/Uj3GWPy

Subscribe to our subreddit here: https://reddit.com/r/Nebula_Devs

A Moomoo Bot Sender with AI.

Press R (minimap ping) for the bots to come to you.

Type "setowner \<your ID>" into the node.js console to make the bot obey your commands.
  
Put the code in showid.js into Tampermonkey so that your ID is visible.


INSTALL:

**NEW VIDEO INSTALLATION GUIDE:** https://www.youtube.com/watch?v=6QfVIt5V4oI

Download node.js here: https://nodejs.org/en/


After node.js is installed, run the following command in your console inside this folder:

npm install


Start: `node index.js [--probeTribe tribeName] [--probeName playerName] [--num numberOfBots] [--link moomooPartyLink] [--tribe tribeName] [--name botName] [--randnames true] [--chat chatMessage] [--ai true]`

--probeTribe searches all Moomoo.io servers for any tribes with the given name and returns the IPs so you can use them with --link.

--probeName does almost the same thing as --probeTribe, but searches the leaderboards for a player with the given name.


Commands:

!id \<player name>: Makes the bots send the ID of a player in chat.
  
!fme: Makes the bots follow you.

!fid \<player ID>: Makes the bots follow the player with that ID.
  
!atkid \<player ID>: Makes the bots attack the player with that ID. [BUGGY]
  
!s: Makes the bots stay.

!r: Releases the bots from control. Different from !s in that pressing R to ping will move them.

!fm: Makes the bots follow your mouse. May be buggy if the robot.js lib didn't compile correctly.
