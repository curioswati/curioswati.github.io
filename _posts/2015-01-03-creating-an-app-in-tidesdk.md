---
title:  "Creating an app in TideSDK: Six steps to go"
date:   2015-01-03 17:08:00
tags: ['html', 'css', 'desktop-app', 'tutorial', 'tide-sdk']
categories: tutorials TideSDK
permalink: /:categories/:title
---

Here you will learn how to create a basic app in [TideSDK](http://tidesdk.multipart.net/docs/user-dev/generated/).
TideSDK is an open source frame work for creating desktop applications using html, css, javascript as front-end and any language like python or php as back-end.
You can find the setup and installation instructions [here](http://tidesdk.multipart.net/docs/user-dev/generated/#!/guide/getting_started-section-3).

First you need to install TideSDK. Now open the TideSDK developer and follow the steps:

* Click on **'New Project'**.

* Fill in the required information. Use the data given below:
      {% highlight bash %}
      Project type        : Desktop
      Name                : DemoApp
      App Id              : com.myapps.demoapp
      Directory           : (Use the path of any directory where you wish to create the app.)
      Company/Personal URL: (Use your site url.)
      {% endhighlight %}
<br>

* Click **'Create Project'**.

   As you click the create button, you can see the information of your application in the same window with some additional information.

   Now browse to the directory in which you created the app.
   You will see a folder named DemoApp there. You can see some folders and files in it.
   You will find detailes about them [here](http://tidesdk.multipart.net/docs/user-dev/generated/#!/guide/getting_started-section-5).
   Here is the directory structure you will get:

      {% highlight bash %}
      |-- CHANGELOG.txt  
      |-- LICENSE.txt
      |-- dist
      |-- Resources
      |   |-- index.html
      |-- manifest
      |-- tiapp.xml
      {% endhighlight %}

<br>

* Now you have to create some files in the resources directory.

   1. First copy the _default_app_logo.png_ from \path\to\TideSDK Developer\Resources\default_app_logo.png into the resources directory.

   2. **app.js**
      {% highlight javascript %}
       var menu = Ti.UI.createMenu(),
       fileItem = Ti.UI.createMenuItem('File'),
       exitItem = fileItem.addItem('Exit', function() {
       if (confirm('Are you sure you want to quit?')) {
           Ti.App.exit();
           }
       });
       menu.appendItem(fileItem);
       Ti.UI.setMenu(menu);
      {% endhighlight %}

   3.**index.html**
      {% highlight html %}
      <!DOCTYPE html>
      <html>
        <head>
          <title>My demo app</title>
        </head>
        <body>
          <div>
            Welcome to the demo app created with TideSDK.
          </div>
          <script type="text/javascript" src="app.js"></script> 
        </body>
      </html>
      {% endhighlight %}
<br>

* Now in the developer, switch to the Test & Package tab of the window. Click **'Launch App'**.
  You can see the live demo of your application.
<br>
<br>

* Now click **'Package with Runtime'**.

  You can now see a folder named packages in your app's directory.
  Browse to packages/win32/bundle/DemoApp/ and there you can see your application file along with some other necessary files.

You have a desktop app that you can now run locally. For packaging the app for distribution, you will need some extra tools.
We will see that in next post. Till then play with your app and do some useful stuff.
