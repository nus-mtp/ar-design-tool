ECHO OFF 
::CMD will no longer show us what command it’s executing(cleaner)
ECHO As a network admin, I’m getting tired of having to type these commands in! Hopefully, this saves me some time in the long run. 
:: Print some text
IPCONFIG /ALL 
:: Outputs tons of network information into the command prompt
PAUSE 
:: Lets the user read the important network information
PING www.google.com 
:: Ping google to figure out if we’ve got internet!
ECHO All done pinging Google. 
::Print some text
PAUSE 
:: Give the user some time to see the results. Because this is our last line, the program will exit and the command window will close once this line finishes.