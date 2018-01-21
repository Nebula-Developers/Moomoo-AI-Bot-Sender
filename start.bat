@echo off
color 0a
:start
cd C:\Users\%username%\Downloads\Moomoo-AI-Bot-Sender-master\Moomoo-AI-Bot-Sender-master
title MooMoo Bot Sender W/ AI
echo Enter party link:
set /p partylink=You:
cls
echo Enter Tribe Name:
set /p tribename=You:
cls
echo Nickname for Bots:
set /p botnick=You:
cls
echo Number of Bots:
set /p numbots=You:
cls
echo Bot Chat Message:
set /p chatmsg=You:
cls
echo AI ON or OFF?
echo 1 = ON
echo 2 = OFF
set /p aionoff=You:
cls
if %aionoff%==1 goto aion
if %aionoff%==2 goto aioff
:aion
node index.js --num %numbots% --link %partylink% --tribe %tribename% --name %botnick% --chat %chatmsg% --ai true

:aioff
node index.js --num %numbots% --link %partylink% --tribe %tribename% --name %botnick% --chat %chatmsg% --ai false