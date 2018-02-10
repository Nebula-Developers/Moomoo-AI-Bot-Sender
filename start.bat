@echo off
cls
color 0a
title MooMoo Bot Sender W/ AI
cd %CD%
cls
@echo off
:start
echo Menu:
echo     1. Bot Sender
echo     2. Prober
set /p menu="Select an option: "
if %menu%==2 goto probe
goto cont
:probe
cls
echo Probe by:
echo     1. Tribe name
echo     2. Player name
set /p probetype="Type: "
cls
if %probetype%==1 goto probebytribe
goto probebyname
:probebytribe
set /p probetribe="Please enter the tribe to search for: "
cls
node index.js --probeTribe %probetribe%
goto endprobe
:probebyname
set /p probename="Please enter the player to search for: "
cls
node index.js --probeName %probename%
goto endprobe
:endprobe
echo ----------
echo Please copy the applicable party link.
pause;
cls
goto start
:cont
cls
set /p partylink="Party Link: "
set /p tribename="Tribe Name: "
set /p botnick="Bot Name: "
set /p numbots="Number of Bots: "
set /p chatmsg="Bot Chat Message: "
set /p ai="AI? (Y/N): "
set /p autoheal="Autoheal? (Y/N): "
set /p randskins="Random Skins? (Y/N): "
set /p hat="Hat ID: "
cls
if /I %ai%==Y set ai="true" & goto checkautoheal
set ai="false"
:checkautoheal
if /I %autoheal%==N set autoheal="false" & goto checkrandskins
set autoheal="true"
:checkrandskins
if /I %randskins%==Y set randskins="true" & goto exec
set randskins="false"
:exec
node index.js --num %numbots% --link %partylink% --tribe %tribename% --name %botnick% --chat %chatmsg% --ai %ai% --autoHeal %autoheal% --randSkins %randskins% --hat %hat%
