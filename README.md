# Moomoo-AI-Bot-Sender
A Moomoo Bot Sender with AI.

Press R (minimap ping) for the bots to come to you.

Type "setowner <your ID>" into the node.js console to make the bot obey your commands.
  
Put the code in showid.js into Tampermonkey so that your ID is visible.


INSTALL:

Download node.js here: https://nodejs.org/en/


After node.js is installed, run the following command in your console inside this folder:

npm install


Start: node index.js [--probeTribe tribeName] [--probeName playerName] [--num numberOfBots] [--link moomooPartyLink] [--tribe tribeName] [--name botName] [--randnames true] [--chat chatMessage] [--ai true]


Commands:

!id <player name>: Makes the bots send the ID of a player in chat.
  
!fme: Makes the bots follow you.

!fid <player ID>: Makes the bots follow the player with that ID.
  
!atkid <player ID>: Makes the bots attack the player with that ID.
  
!s: Makes the bots stay.

!r: Releases the bots from control. Different from !s in that pressing R to ping will move them.

!fm: Makes the bots follow your mouse. May be buggy if the robot.js lib didn't compile correctly.
