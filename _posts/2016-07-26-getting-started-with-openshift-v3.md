---
title:  "Getting started with openshift v3"
date:   2016-07-28 16:25:00
tags: ['index', 'docker', 'ansible', 'deployment', 'tutorial', 'openshift']
categories:  tutorials infra
permalink: /:categories/:title
---

As a part of my [internship](http://swatij.me/outreachy/dont-give-up-till-you-get-in/),
I am learning to understand the related project [Openshift Origin](https://www.openshift.org/) also.
The [project](https://github.com/ftl-toolbox/ftl_installer) that I got selected for is a general installer for openshift variants only.

In the process, I was trying my hands on deploying an origin cluster and a sample application with it.
Although their [documentation](https://docs.openshift.org/latest/welcome/index.html) is all that you need.
But for a complete beginner, it's still difficult to connect dots. So here I am trying to summarize what I learned from my experience.
I too was a beginner but my mentors were there to help, so I hope it helps others. 
<br>
<br>

## Introduction

[Openshift](https://www.openshift.com/) is a [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service).
For those who don't understand what PaaS is, [this post](https://blog.openshift.com/what-is-platform-as-a-service-paas/) explains it very well.
Origin is the Open Source project that powers openshift.
As [this post](https://blog.openshift.com/getting-started-with-openshift-origin-the-open-source-platform-as-a-service-paas/) suggests,
with Origin now we can do it all ourselves and see how it works!

So let's begin!

We will follow the following procedure:

* Deploy Openshift cluster using openshift-ansible.
* Deploy Docker Registry.
* Deploy Router.
* Deploy a sample application.
<br>
<br>

## Preperaing for Install
<font size="3px">
<i><b>Note:</b> We are trying the installation in a centos Virtual Machine as the <a href="https://docs.openshift.org/latest/install_config/install/prerequisites.html#install-config-install-prerequisites">prerequisites</a>
from the docs requires the base OS to be one of the: Fedora 21, CentOS 7.1, or RHEL 7.1 or later with "Minimal" installation option, or RHEL Atomic Host 7.2.4 or later.</i>
</font>
<br>

We will need to make sure our environment is ready for the installation. So here is a quick checklist:

* Install [Virtualbox](https://www.virtualbox.org/wiki/Downloads).
* Install [Vagrant](https://www.vagrantup.com/docs/installation/).
* Setup a centos box. (You can use this [Vagrantfile](https://gist.github.com/curioswati/703e86eeb701fe10f3808bb0f25f524a)).
* Create and start the VM:        

        vagrant up

* Ensure host access through ssh:        

        ssh-copy-id -i ~/.ssh/id_rsa.pub vagrant@host

<font size="3px">
<i><b>Note:</b> <code>host</code> is the VM's ip.</i>
</font>
<br>

* Install [Ansible](http://docs.ansible.com/ansible/intro_installation.html).
<br>
<br>

## Step I: Deploy Origin Cluster

There are many methods listed in the [documentation](https://docs.openshift.org/latest/install_config/install/index.html). Here we will use the [advanced installation](https://docs.openshift.org/latest/install_config/install/advanced_install.html#install-config-install-advanced-install).

To be able to install origin using ansible, we need the openshift-ansible setup. First, we need a hosts file (inventory) to specify the hosts for ansible.

Create the hosts file in `/etc/ansible/hosts`.

{% highlight python %}
# Create an OSEv3 group that contains the masters and nodes groups
[OSEv3:children]
masters
nodes
# Set variables common for all OSEv3 hosts
[OSEv3:vars]
# SSH user, this user should allow ssh based auth without requiring a password
ansible_ssh_user=vagrant
ansible_become=true

deployment_type=origin

# enable htpasswd authentication; defaults to DenyAllPasswordIdentityProvider
openshift_master_identity_providers=[{'name': 'htpasswd_auth', 'login': 'true', 'challenge': 'true', 'kind': 'HTPasswdPasswordIdentityProvider', 'filename': '/etc/origin/master/htpasswd'}]

# host group for masters
[masters]
<host-ip>

# host group for nodes, includes region info
[nodes]
<host-ip> openshift_node_labels="{'region': 'infra', 'zone': 'default'}"
<host-ip> openshift_node_labels="{'region': 'primary', 'zone': 'east'}"
{% endhighlight %}

<font size="3px">
<i><b>Note:</b> If you installed ansible using your system package manager, you already have <code>/etc/ansible/hosts</code>.
If you installed it using pip then you will have to manually create the file.
</i>
</font>
<br>
The above file specifies two groups. masters and nodes. Let me brief the terms.

From origin docs:

> Within OpenShift Origin, Kubernetes manages containerized applications across a set of containers or hosts and provides mechanisms for deployment, maintenance, and application-scaling. Docker packages, instantiates, and runs containerized applications. According to origin architecture.

> A Kubernetes cluster consists of one or more masters and a set of nodes.

_**[master](https://docs.openshift.org/latest/architecture/infrastructure_components/kubernetes_infrastructure.html#master):**_
A master is a host which contains components as API server, control manager server (which automates deployments and configurations), and etcd. It manages the nodes and schedules pods on them.

_**[pod](https://docs.openshift.org/latest/architecture/core_concepts/pods_and_services.html#pods):**_ A Pod is one or more container. It is the smallest unit that can be defined, deployed and managed. They are mainly part of some service. It could be a service like a private docker registry, router, a db service or some application. They have their own internal IP. The containers in a pod share the storage and networking.

_**[node](https://docs.openshift.org/latest/architecture/infrastructure_components/kubernetes_infrastructure.html#node):**_ A node is a host that provides runtime environment for the containers. It is where an application or service is deployed.

I have briefed the terms. To better understand them, follow the links and also read the [Origin Kubernetes Architecture](https://docs.openshift.org/latest/architecture/infrastructure_components/kubernetes_infrastructure.html).
So, in our example both the nodes and the masters will be the same host i.e. the virtual machine we have created and is now running.

Now, our inventory is ready. It's time to clone the repository and run the playbook:
{% highlight bash %}
git clone https://github.com/openshift/openshift-ansible.git
ansible-playbook openshift-ansible/playbooks/byo/config.yml
{% endhighlight %}

<font size="3px">
<i><b>Note:</b> running the playbook will ensure the cluster is setup and all the necessary dependencies are too.</i>
</font>
<br>

Now our cluster is setup and running. We need to move to next step. 
<br>
<br>

## Step II: Deploy Docker Registry

### Deploying the registry

For us to be able to deploy our application and automate the builds and schedule deployments, we need to create and run our private docker registry in origin. Origin build docker images from our application source code, deploy them and manage their lifecycles through this internal registry.

First ssh into the VM:    

    vagrant ssh <vm-name>

To deploy the registry in the Openshift Origin environment, run following:    

    sudo oadm registry --config=/etc/origin/master/admin.kubeconfig --service-account=registry

To check the status of deployment, run:    

    oc status

If it takes too long, then to debug; run:    

    oc get pods
    oc describe pod <deploymentConfigName> 

Here the `<deploymentConfigName>` is the name of the pod, you can easily identify it in the list you get from `oc get pods`.

Once the status shows deployed, you can view logs for the registry with:    

    oc logs dc/docker-registry

### Troubleshooting

If you encounter problems with internet or some other issues, you can delete and re-deploy the registry.    

    oc delete svc/docker-registry; oc delete dc/docker-registry

If `describe pod` shows image pull issues, try pulling the image manually with:    

    sudo docker pull openshift/origin-deployer:v1.2.0

<br>
Now our registry is deployed and running. You can check it by running `oc get pods`. You will see the status of the pod `running`. 
<br>
<br>

### Accessing the registry directly

We need to give our user the permissions to access the registry to push and pull images. As we enabled htpasswd authentication in our inventory.
We will proceed with that.    

    htpasswd /etc/origin/master/htpasswd <user_name>
    oadm policy add-role-to-user system:registry <user_name>
    oadm policy add-role-to-user admin <user_name> -n openshift
    oadm policy add-role-to-user system:image-builder <user_name>

<br>
The `<user_name>` should be your system login user. For example in our case, it's `vagrant`. The commands does the following in their order:

* creates a regular user that can later generate access token to log into the registry.
* gives the `<user_name>` the <b>system:registry</b> role.
* for docker operations, it provides the `<user_name>` admin role for the openshift project.
* for pushing images, it gives the `<user_name>` <b>system:image-builder</b> role.

Now we will log in the registry and try to pull and push images to ensure everything is working properly. 
<br>
<br>

### Logging into the registry

Log in Openshift Origin as the regular user:    

    oc login

Get acces token to log in the registry:    

    oc whoami -t

Log into the docker registry:    

    sudo docker login -u <username> -e <email> -p <access_token> <registry_ip:port>

You can get the registry ip and port by running `oc status` and looking at the first line starting with `svc/docker-registry`.

Pull and arbitary image:    

    sudo docker pull docker.io/busybox

Tag the image:    

    sudo docker tag docker.io/busybox <registry_ip:port>/openshift/busybox

Push the newely tagged image:    

    sudo docker push <registry_ip:port>/openshift/busybox

Here we complete the registry part. You can read the docs for [deploying docker registry](https://docs.openshift.org/latest/install_config/install/docker_registry.html#install-config-install-docker-registry) for more details about how to secure the registry to expose it in public, to study the configuration details, to maintain ips across deployments etc. 
<br>
<br>

## Step III: Deploy Router

A router is already created when we deployed the cluster. But it might not have deployed properly. So we will delete it first and then re-deploy.

Run the following:    

    oc delete svc/router; oc delete dc/router

Now first we need to create a router service account:    

    oc create serviceaccount router -n default

To add a priviledged SCC:    

    oadm policy add-scc-to-user privileged system:serviceaccount:default:router

To deploy the default HAProxy router:    

    oadm router --service-account=router --credentials=${ROUTER_KUBECONFIG:-"$KUBECONFIG"}

You can check the status and pods with same commands that we used for registry. For debugging, the `oc describe` can be used with the pod's name that's deployed for router. 
<br>
<br>

## Step IV: Deploy a sample application

Now we have our registry ready to push images of our source code and the router to serve our application on the ip. We can create and deploy a sample application.

You can follow the [Openshift rails tutorial](https://docs.openshift.org/latest/dev_guide/app_tutorials/ruby_on_rails.html) for this part.

And we are done!