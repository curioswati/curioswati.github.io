---
title:  "How to digitally sign and encrypt a mail using ThunderBird"
date:   2016-06-02 11:00:00
tags: ['thunderbird', 'gpg', 'signing', 'encryption', 'mail']
categories: howto
permalink: :categories/:title
---
Hello!

Today we will see how to create a gpg key and use that for signing and encrypting mails.
The procedure is in three steps:

* Create a GPG key
* Set up the mail client to use the key.
* Sign the mail.

<br>
First of all, let us know our platform. So we are using ubuntu 14.04 with [Thunderbird](https://www.mozilla.org/en-US/thunderbird/) as the mail client. Mail provider is [Gmail](https://mail.google.com).
Although it doesn't make much difference, for that the procedure remains same for other providers too.

Let's Begin!
<br>
<br>
<br>

### Create the GPG key
Firstly, install the [GnuPG](https://gnupg.org/) client (if you don't have it already).    

    sudo apt-get install gnupg

Now create a key-pair    

    gpg --gen-key

<br>
This will take you through few questions that will configure your keys:

* Please select what kind of key you want: **(1) RSA and RSA (default)**
* What keysize do you want? **4096**
* Key is valid for? **0**
* Is this correct? **y**
* Real name: **your real name here**
* Email address: **your_email@address.com**
* Comment: **Optional comment that will be visible in your signature**
* Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? **O**
* Enter passphrase: **Enter a secure passphrase here (upper & lower case, digits, symbols)**

<br>
Now you need to do some random stuff to give GPG enough random bytes to make the key as unpredictable as possible. Type on the keyboard, use mouse, perform disk operations.
When It gets enough random bytes, It will generate the key. It might take some time.

Now you have the key-pair ready for use. You can also create a revocation certificate, import other user's public keys, and other stuff. See the [reference 1](#references) for details on that.

Now comes the second part.
<br>
<br>

### Set up mail client to use the key
We need two tools for this purpose. First is GnuPG (which we already installed) and the other is an add-on for Thunderbird that is [Enigmail](#).

* You need to select `Tools > Add-ons` in Thunderbird menu.
* It will drop you into an add-on window. Type `Enigmail` in the search box.
* Select the related Enigmail tool and install.

<br>
After installing, when you open Thunderbird, you will be asked to setup Enigmail.
Just proceed with the setup. It will guide you through the steps.

1. Click **I prefer a standard configuration (recommended for beginners)**.
2. Select **I want to select one of the keys below for signing and encrypting my email**.
3. Now select your already created key.
4. Click **Next**.
5. Next window says:        

        Enigmail is now ready to use.
        Thank you for using Enigmail.
6. Click **Finish**.

For details, you can see [reference 2](#references).
<br>
<br>

### Sign the mail
Now there are two cases.

#### _You are composing a fresh message_.

* Just compose the message as usual.
* Click **Sign this message** button from Enigmail toolbar. You can also select **Encrypt the message** option if you will.
  * If you selected to just Sign the message.
    * It will sign your message with the key and send it normally.
  * If you select **Attach My Public Key** option as well.
    * It will sign the message and attach your public key file in the message.
  * If you click **Encrypt** option.
    * It lists all the previously imported public keys.
    * It will try to find a public key of the receiver.
    * If there exist no public key, It will ask you to download missing key. Try this if you know that receiver indeed has a public key.
    * If there is some alternate key for the user, you can use that too. Just type in the mail address with which the key is linked and click **download missing keys** button.
    * Now you can see the key listed. Just select the key and click **Send**.

After this process, whenever the next time you send an encrypted and signed message to the same receiver, it will use the recently imported key.
<br>
<br>

#### _You are replying to mail with a public key in it_.
* You can compose the mail as usual.
* Now the message will automatically be signed and encrypted. (Uncheck if you don't want either of the options).
* When you click **send**, It will ask your passphrase(private key), just enter it and you are done.
_Note: If the mail doesn't include a public key, then the procedure will be same as the fresh message._

Done. For queries, please refer the links in references. I have just picked up the important parts from them.
<br>
<br>


### References
1. [https://www.digitalocean.com/community/tutorials/how-to-use-gpg-to-encrypt-and-sign-messages-on-an-ubuntu-12-04-vps](https://www.digitalocean.com/community/tutorials/how-to-use-gpg-to-encrypt-and-sign-messages-on-an-ubuntu-12-04-vps)
2. [https://support.mozilla.org/en-US/kb/digitally-signing-and-encrypting-messages](https://support.mozilla.org/en-US/kb/digitally-signing-and-encrypting-messages)
