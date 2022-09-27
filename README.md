# DDoS Protection Example
This is my DDoS Protection against Layer 7 using my own knowledge. Which stops some DDoS attacks. But can also stop massive ones to a certain point :)

# Why?
I made this to mainly help myself and reduce DDoS attacks on my website (https://nulls.sbs). BUT found that It is really useful and wanna share with everyone :)

# Information
There is going to be a few options to adjust to make it suit best for your VPS or dedicated server. They are located and look like. 
![image](https://user-images.githubusercontent.com/79751099/192421313-16b8c3a9-71a7-4a2c-a043-25adcb724e4b.png)

`infractionsMax` can be changed. That is the amount of times someone can refresh really fast before it blacklists them.             
`requestTime` can also be changed. This is the response time of the client connecting ( In theory. I may be wrong, I dont really know but it worked :) )

So. How this works is that it compares the first connect and the new connection time (If they refresh or close the tab and open again) against each other and if its below the `requestTime` it increases the `infractionsMax` to give them a sorta safe zone. 

All ips that are blacklisted are saved into a file called `ddos-filtered.cache` its located right next to the `app.js` file. Feel free to change this to anywhere you want it to be.

# How effective is it?.
Well, Being honest its super effective to a certain point. When experiencing a DDoS Attack you want the legimate traffic to come through still. So I made a different approach using Javascript. Located inside the `index.html` you will find a script that is asking for a prompt before closing the page which helps to detect Malicious traffic. Most DDoS tools or Botnets dont listen to Javascript meaning they send the request over and over and over really fast to the point of butchering the CPU and RAM of the VPS. And since legimate traffic or legimate users wont be able to click *leave* on the popup really fast it allows the `requestTime` to be changed to suit best for you.


# Reminder
You have to change `infractionsMax` and `requestTime` to suit your VPS. Otherwise it will blacklist people randomly. You have to find the *good* spot.
