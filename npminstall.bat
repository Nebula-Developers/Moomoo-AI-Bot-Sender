title NPM Installer
@echo off
cls
color 0a
npm uninstall robotjs
npm install
npm install --global --production windows-build-tools
npm config set python python2.7
npm config set msvs_version 2015
echo -----
echo You can now close this window.
