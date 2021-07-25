---
title:  "My Fragile Commenting System."
date:   2021-07-25 17:40:00
tags: ['index', 'toolbox', 'hacks', 'comments', 'blog-housekeeping']
categories:  hacks
permalink: /:categories/:title
---
If you have interacted with this blog any time and any of the following happened to you:  

- You put a comment and wondered where it vanished on refresh?
- Your comment doesn't submit.
- You ask a question and don't get reply from me for months.

I have complete empathy for your frustration and apologies for this irresponsible behaviour.

If you have scratched your head and sweared on never coming back, I don't have any hard feelings for you.
Yet if you are here, I **Thank You**. If you are new here, bear with me.

<br/>
### Comments &#128172;

One drawback or rather inconvenience of using [Jekyll](https://jekyllrb.com/) has been to deal with comments.
I chose Jekyll because of **1)** easy maitainability (thanks to Github!) and **2)** the complete control I got over my content.
This is why I never wanted to plug in any third party commenting system and that's when I came across jekyll-discuss (now [staticman](https://github.com/eduardoboucas/staticman)).

The project has been upgraded a long way from when I found it, I still have the old fork at [curioswati/jekyll-discuss](https://github.com/curioswati/jekyll-discuss).
I won't go into the internals of the project here but I can tell you it fulfills the basic need of the system for me.

<br/>
### The Problem(s)&#10067;

The initial setup was a happy endeavor. Comments were coming in, all good. Then I started seeing the problem.
My blog was not interacting with the readers. Even though it took their comments in and I replied whenever I saw them, there was a bigger design problem.

#### I.
The way the system is setup, it renders the comment instantly with the help of Javascript even before it has been updated to the backend and this behaviour is silent.
The user will see their comment appearing instantly and think, it is recorded permanantely. It is later on by a refresh they realize it's not there anymore
(because it will take some time for it to get submitted to github and rendered from there). They think it went missing and make another comment.

#### II.
I have been hosting the commenting system on a free cloud instance which comes with limited resources. On top of that I was running two memory heavy projects there.
You know my fate then! The services often got into a run for memory and stopped responding.
The added problem was, I was always late to the fiasco. It is generally not convinient to keep an eye on the system everyday, right?

#### III.
Carelessness or lack of proactive communication from the system?  
I initially (and that run for long enough) didn't setup subscriptions (email notifications), which was already a feature in the proejct.
Result? well I was never aware if someone had some query or worse, **if the system went down**.

<br/>
### Resolutions &#128524;

First things first, I have fixed the UX a bit. Now whenever you submit a comment, you will see a message prompt giving you the information you need to know.

Then I have offloaded the host off the other service, so now comments have enough room.

Lastly I have setup email notifications. Although that experiment has been done long time back but broke some time back due to a migration done carelessly.
But everything is fine now.

<br/>
We probably didn't need this post, but I still felt accountable to give you the reasoning for the glitches you might have faced.
I want to assure you that this blog is not orphan or left out of care. I still maintain it. Sometimes, I'm just busy and still learning to communicate better.  
My blog has been a playground of experiments I keep doing and I'm still learning a lot of new things, both technically and from the design perspective to make it more usable
while still keeping the core intact i.e. I have complete control over every part of it and it runs minimal.

If you follow the blog and find more glithces, please do write to me, I will make sure to address them.

Have a nice day!
