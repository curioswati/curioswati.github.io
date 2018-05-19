---
title:  "Writing a python script to install apache open office"
date:   2015-01-31 17:50:00
tags: ['tool', 'CLI', 'apache-open-office', 'scripting', 'python']
categories: hacks
permalink: /:categories/:title
---
<p>We will be writing a python script to create an installer for apache open office for Linux.</p>
<p>Here is the code, we will go through it step by step.</p>
{% highlight python %}
#!/usr/bin/env python
import subprocess
import optparse
import platform
{% endhighlight %}

Here, we have imported some python libraries.

* <a href="https://docs.python.org/2/library/subprocess.html">subprocess</a>: is used for running the bash commands.
* <a href="https://docs.python.org/2/library/optparse.html">optparse</a>: is for command line option parsing.
* <a href="https://docs.python.org/2/library/platform.html">platform</a>: is used for getting the details of the system on which the script is running.

{% highlight python %}
install = []
uninstall = ["sudo apt-get purge openoffice*.* && sudo apt-get autoremove"]
PLATFORM = platform.system()
ARCHITECTURE = platform.architecture()[0]
{% endhighlight %}
<p>Here are the global variables.
	<ul>
		<li><b>install</b>: for collecting commands for install option.</li>
		<li><b>uninstall</b>: for collecting commands for uninstall option.</li>
		<li><b>PLATFORM</b>: for identifying operating system.</li>
		<li><b>ARCHITECTURE</b>: for identifying processor.</li>
	</ul>
</p>

{% highlight python %}
#----------------------------Running commands-----------------------------
def run_commands(cmds):
  """
  Function which run all the commands one by one.
  """
  for cmd in cmds:
    subprocess.call(cmd, shell=True)
{% endhighlight %}
<p>The function to run commands one by one.</p>

<p>Here is the controller, which does all the command line handling. Let's take it in parts.</p>
{% highlight python %}

#---------------------------Option parsing--------------------------------
def controller():
    """
    Function which does parsing of command line options and
    also prepares a list of commands that are used for installation.
    """
    global VERBOSE, install, uninstall

    #Create instance of OptionParser Module, included in Standard Library and adds option in it.
    p = optparse.OptionParser(
                          description='For installing Apache open office',
                          prog='install-open-office',
                          version='install-open-office 0.1',
                          usage= '%prog [option]')
    p.add_option('--install','-i', action="store_true", help='installs open office')
    p.add_option('--uninstall', '-u', action="store_true", help='uninstalls open office')
    p.add_option('--Version', '-V', help='specifying version')
    p.add_option('--verbose', '-v',
                action = 'store_true',
                help='prints verbosely',
                default=False)
{% endhighlight %}
<p>In this part, we first created an OptionParser object to handle command's options. Then added some custom options and their details. The option parser takes some arguments like the description of the command, the program name, version, and its usage details. Then the ad_option takes option name, its descriptive name, the action on option, (in our case to store default option value as true) and help string for option.
</p>
{% highlight python %}
    #Option Handling passes correct parameter to runBash
    options, arguments = p.parse_args()

    if options.verbose:
        VERBOSE=True
    if options.install:
    #--------------------------setting commands---------------------------
	    #Removing libreoffice
	    install.append("sudo apt-get remove --purge libreoffice* libexttextcat-data* && sudo apt-get autoremove")
	    #removing openoffice
	    install.append("sudo apt-get purge openoffice*.* && sudo apt-get autoremove")

	    #change to /tmp
	    install.append("cd /tmp")

	    #download the application
	    if PLATFORM == "Linux":
	      ##For 4.0.1
	      if options.Version == "4.0":
	        if ARCHITECTURE == "32bit":
	          INSTALL.append("wget http://sourceforge.net/projects/openofficeorg.mirror/files/4.0.1/binaries/en-US/Apache_OpenOffice_4.0.1_Linux_x86_install-deb_en-US.tar.gz")
	        elif ARCHITECTURE == "64bit":
	          INSTALL.append("wget http://sourceforge.net/projects/openofficeorg.mirror/files/4.0.1/binaries/en-US/Apache_OpenOffice_4.0.1_Linux_x86-64_install-deb_en-US.tar.gz")
	      elif options.Version == "4.1":
	        if PLATFORM == "Linux":
	          if ARCHITECTURE == "32bit":
	            INSTALL.append("wget http://sourceforge.net/projects/openofficeorg.mirror/files/4.1.1/binaries/en-US/Apache_OpenOffice_4.1.1_Linux_x86_install-deb_en-US.tar.gz")
	          elif ARCHITECTURE == "64bit":
	            INSTALL.append("wget http://sourceforge.net/projects/openofficeorg.mirror/files/4.1.1/binaries/en-US/Apache_OpenOffice_4.1.1_Linux_x86-64_install-deb_en-US.tar.gz")
	    else:
	      print "Wrong operating system detected."

	    #extract
	    install.append("tar -xvf Apache_OpenOffice*.tar.gz")

	    #install deb
	    install.append("sudo dpkg -i en-US/DEBS/*.deb")

	    #install the desktop-integration
	    install.append("sudo dpkg -i en-US/DEBS/desktop-integration/*.deb")

	    value = run_commands(install)

    elif options.uninstall:
        value = run_commands(uninstall)

    else:
        p.print_help()
{% endhighlight %}
<p>Here, first we have called the parse_args to parse the collected option in p. And then according to the options used, we have taken different actions. Like:<br>
if verbose is used then set VERBOSE mode on.<br>
if -i is used then append installation command to the global INSTALL list and call the method to run the commands.<br>
if uninstall is used then call the run_commands method with the uninstallation command.<br>
If no option is given then print the help menu.
</p>

{% highlight python %}
#Runs all the functions
def main():
    controller()

#This idiom means the below code only runs when executed from command line
if __name__ == '__main__':
    main()

{% endhighlight %}
<p>Finally, call the controller in main method and main method is called automatically by the program.</p>
<p>And here the program ends. We have created our installer script to install apache open office. Next, You have to make the script executable.</p>
<pre>
chmod +x install_apache_open_office.py
</pre>
<p>To run the script use:</p>
<pre>
bash install_apache_open_office.py
</pre>
<p>You can clone the script from <a href="https://gist.github.com/curioswati/ca19ea4e412624b52006">Github Gists</a>.<br>
You can also find other installers there for installing anaconda and ruby 2.2. Just download and make them executable and run then.</p>
