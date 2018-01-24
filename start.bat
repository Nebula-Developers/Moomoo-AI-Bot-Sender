@echo off
color 0a
title MooMoo Bot Sender W/ AI
cd %CD%
::: %#((#(##%%%&&&&&&&@@@@@@@@@@@
::: ##(##%%%%%&&&&@@@@@&@@@@@@@@@
::: ##%%%%%%%%%&&@@@@@&&%&&&&@@@@
::: ###%%%&&&&&&&&@&&&&&%%%&&&&@@
::: %##%%&&.   *@&&&&&.  .&%%&&&&
::: %%%%&&&.     %&&@@.  .@@@&@@@
::: &&&&&&&.  .   ,@@@.  .@@@@@@@
::: &&&&&&&.  .&%   ,@,  .@@@@@@@
::: &&&&&&&.  .&&@.   .  .@@@@@@@
::: &&&&&&&.  .&&@@&.    .@@@@@@@
::: &&&&&%%.  .@@@@@@,   .@@@@@@@
::: %%%%%%%##%%@@@@@@@@#@@@@@@@@@
::: %%%%%%%%%&&@@&&&&&&@@@@@@@@@@
::: &%%%%%%%%%&&&&&&&@@&&@@@@@@@@
for /f "delims=: tokens=*" %%A in ('findstr /b ::: "%~f0"') do @echo(%%A
echo MooMoo Bot Sender Starter
echo -------------------------
timeout /t 4
cls
:start
echo Use Probe for connecting bots w/o using a server link?
echo 1 = YES
echo 2 = NO
set /p probe=You:
if %probe%==1 goto probe
if %probe%==2 goto cont
:probe
cls
echo Please enter in tribe name:
set /p probetribe= You:
cls
echo Please enter in player name:
set /p probename= You:
cls
node index.js --probeTribe %probetribe% --probeName %probename%
echo ----------
echo Please copy the applicable party link.
pause;
cls
goto cont
:cont
cls
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
