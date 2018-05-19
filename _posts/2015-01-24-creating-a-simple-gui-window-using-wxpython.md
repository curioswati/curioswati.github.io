---
title:  "Creating a simple GUI window using wxpython"
date:   2015-01-24 06:30:00
tags: ['GUI', 'tutorial', 'wxpython', 'python']
categories: tutorials wxpython
permalink: /:categories/:title
---

Let's get started with wxpython. We will see how to create a simple window named **Hello World**!.

First, get wxpython.

_**Windows**_:  Download it from <a href="http://www.wxpython.org/download.php">here</a>.<br>  

_**Linux**_  :    

    sudo apt-get install python-wxgtk2.8 python-wxtools wx2.8-doc wx2.8-examples wx2.8-headers wx2.8-i18n libwxgtk2.8-dev libgtk2.0-dev

We will have two python files for this example. Those are :<br>
{% highlight bash %}
|- window.py
|- class_Mypanel.py
{% endhighlight %}

Now here is the code for the _window.py_.
{% highlight python %}
import wx
from class_Mypanel import Mypanel
#--------------------------------------------------------------------
def main():
    '''
    The main function which creates the window and box objects and uses
    Mypanel class for creating widgets and binding events.
    '''
    app = wx.App()

    win = wx.Frame(None,title = "Hello World",size=(400,220))

    bkg = wx.Panel(win)
    
    Mypanel(bkg,win)

    win.Show()

    app.MainLoop()

#--------------------------------------------------------------------
if __name__ == '__main__':
    main()
{% endhighlight %}

Let's go line by line.

First, we create an application object to start the application.
{% highlight python %}
app = wx.App()
{% endhighlight %}

Then we create a window and a panel object. A panel is what wraps the widgets in the window. It is a transparent object which you can't see.
{% highlight python %}
win = wx.Frame(None,title = "Hello World",size=(400,220))
bkg = wx.Panel(win)
{% endhighlight %}

Next we call the class Mypanel, and pass the window and panel objects as arguments.
{% highlight python %}
Mypanel(bkg,win)
{% endhighlight %}

After that we show the window with show method on the window object.
{% highlight python %}
win.Show()
{% endhighlight %}

And finally we run a loop through the application object to hold the GUI until we send a close message.
{% highlight python %}
app.MainLoop()
{% endhighlight %}

<br>
Next let's look at _class_Mypanel.py_.
{% highlight python %}
import wx

#--------------------------------------------------------------------
class Mypanel(object):
    def __init__(self,panel,win):
        self.win = win                             #The window object
        self.panel = panel                         #The panel object
        self.panel.SetBackgroundColour((198,222,223,255))
        self.panel.SetForegroundColour((60,60,60,255))
                       
        #---------------------Buttons and events---------------------
        #calls Close method
        close_btn = wx.Button(panel, -1, "Close",size=(100,30),
                              pos=(120, 60))
        close_btn.SetBackgroundColour((98,208,255,255))
        close_btn.SetForegroundColour("Black")
        close_btn.SetToolTipString("Close")
        close_btn.Bind(wx.EVT_BUTTON,self.Close)

        self.win.CenterOnScreen()
        #------------------------------------------------------------

    def Close(self, event):
        '''
        Method to close window.
        '''
        self.win.Destroy()

{% endhighlight %}

<br>
Here is the structure of the file.
{% highlight bash %}
  |-Mypanel
    |-__init__
    |-close
{% endhighlight %}

* **__init__**:

   This is the constructor method, which is called at the time of object creation. In this method, we create all the widgets that we want in our window.

   First we set some instance variables for window and panel objects and also set some properties for the panel.
   We have assigned the objects to instance variables so that we can access them in the instance methods like in close method in our example.
   {% highlight python %}
   self.win = win                                      #The window object
   self.panel = panel                                   #The panel object
   self.panel.SetBackgroundColour((198,222,223,255))
   self.panel.SetForegroundColour((60,60,60,255))
   {% endhighlight %}

   Then we create a button. We bind an event to this button, which causes the close method to be called whenever that event is triggered by clicking the button.
   {% highlight python %}
   close_btn = wx.Button(panel, -1, "Close",size=(100,30), pos=(120, 60))
   close_btn.SetBackgroundColour((98,208,255,255))
   close_btn.SetForegroundColour("Black")
   close_btn.SetToolTipString("Close")
   close_btn.Bind(wx.EVT_BUTTON,self.Close)
   self.win.CenterOnScreen()
   {% endhighlight %}

   The first line calls the wx button constructor which takes the first argument panel as its parent. A title, an id, and position and size of the button are other arguments.

   In next three lines, we set the bg color, fg color and help string for button and in the next line we bind the close method to button with a button event.
   The last line positions the window on the center of the screen.

* **close**:

   This method is used to close the window. It is called when close button is clicked. It contains a single line which destroys the window object.
   {% highlight python %}
   self.win.Destroy()
   {% endhighlight %}

That's all. Now when you run the _**window.py**_, you see a window with a close button.

We'll see next how to create different widgets, like text areas, check boxes, radio buttons and different properties which can be applied on the widgets.
We will also see how to add images in the window and setting icon for the window and much more in upcoming posts.
