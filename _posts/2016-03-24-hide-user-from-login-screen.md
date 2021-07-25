---
title:  "How to hide a user from login screen in ubuntu 14.04"
date:   2016-03-24 20:30:00
tags: ['login-preference', 'hacks', 'ubuntu']
categories: howto
permalink: /howto/hide-user-from-login-screen-in-ubuntu-14-04.html
---
<p>
Today, while trying to apply some personalization to my pc, I learned a new hack. So sharing it here, hope it might help some of you.
</p>
<p>
<strong>Origin of the problem:</strong> I wanted to hide my administrator account from others. So first as a naive trick, I renamed it to Guest Session and created a standard user with my login name. But very obvious, It was not a good solution. So I looked for a way to re order the user names in login screen, so that the Guest Session I created would not appear in the list on top and will look like a normal guest login. While finding that I came across some posts saying, to hide the user from login screen.
</p>
<p>Yeah! that was something I was looking for. So here is the solution in few steps.</p>
<p>
<h3> <b>1. Hide the user</b> </h3>
First make the `user` a system user, so it will get hidden from login screen.
{% highlight bash %}
cd /var/lib/AccountsService/users/
sudo vim user.conf
{% endhighlight %}
</p>
<p>
Here <i>user</i> is the name of the user you want to hide.
Now, change following:
{% highlight bash %}
SystemAccount=false
{% endhighlight %}
To:
{% highlight bash %}
SystemAccount=true
{% endhighlight %}
So, you hid your user. Now How will you login? For that you need a manual login method.
</p>
<p>
<h3> <b>2. Add manual login option</b> </h3>
</p>
<p>
{% highlight bash %}
sudo vim /usr/share/lightdm/lightdm.conf.d/50-ubuntu.conf
{% endhighlight %}
add the following line at last,
{% highlight bash %}
greeter-show-manual-login=true
{% endhighlight %}
</p>
<p>
Done.<br> 
Now you can reboot the system. You will see there is no login for $USER. Although there will be an option to login manually using username and password. Go for it!
</p>
