---
title: Webservice Folder Structure
layout: post
categories: webservice
date: 2018-09-26 19:07:54 +0000
summary: webservice folder structure
keywords: ''
tags:
- webservice
- software-architecture
- software
- architecture
- golang
- go
- models
redirect_from: []

---
![](/images/webservice-folder-structure-golang.png)

Webservice folder structure is the first phase before building every project, it's like you prepare to build a house and start by creating the architecture plan.

This article will present how I structure my projects when I need to create a simple web service in Golang. It's very important for you to keep a simple but intuitive architecture, because as you know, in golang you can call methods by referencing the package name.

In the following lines I'll present a simple, but traditional model architecture used by me in most of the web services that I'm involved in.

## /api

The api package is the folder where all the API endpoints are grouped into sub-packages by the purpose they serve. That means, I prefer to have a special package with it's main scope to solve a specific problem.

For example all the login, register, forgot password, reset password handlers, I prefer to be defined into a package named **registration**.

The registration package can look like below:

    .
    ├── api
    │   ├── auth
    │   │   ├── principal.middleware.go
    │   │   └── jwt.helper.go
    │   ├── cmd
    │   │   └── main.go
    │   ├── registration
    │   │   ├── login.handler.go
    │   │   ├── social_login.handler.go
    │   │   ├── register.handler.go
    │   │   ├── social_register.handler.go
    │   │   ├── reset.handler.go
    │   │   ├── helper.go
    │   │   └── adapter.go
    ├── cmd
    │   └── main.go
    ├── config
    │   ├── config.dev.json
    │   ├── config.local.json
    │   ├── config.prod.json
    │   ├── config.test.json
    │   └── config.go
    ..........................

#### handler.go

As you can see, there is a **handler.go** suffix in the name of the files. In these you can effectively write the code, which will handle the request, where the data requested will be retrieved from the database, processed and in the end the response will be composed.

A simple example which explain better can be shown below:

```go
http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
	...
    // handle the request
})
```

#### helper.go

Sometimes, before sending the response, you need to collect data from multiple places to process them, and after that, when all the details are collected, the response can be sent to the client app. But the code must be kept as simple as possible in the handler, so all that extra code which is part of the process can be put here.

#### adapter.go

In the interaction between a client and a web service, they are sending and receiving data, but at the same time, there is probably a third party API involved, another application, or the database. Having this in mind, before transferring the data from an application to another one, we need to convert the format, before being accepted by the new app. This conversion function can be written here, in this _adapter.go_ file.

For example, if I need to convert a struct `A` to a struct `B`, I need an adapter function which looks like:

```go
type A struct {
	FirstName string
	LastName  string
	Email     string
}

type B struct {
	Name  string
	Email string
}

func ConvertAToB(obj *A) *B {
	return &B{
		Name:  obj.FirstName + obj.LastName,
		Email: obj.Email,
	}
}
```

### /api/auth

Most web services must have at least one authorization method implemented, like:

* [OAuth](https://en.wikipedia.org/wiki/OAuth) — Open Authentication
* Basic Authentication
* Token Authentication (I prefer this one with JWT — [JSON Web Token](https://jwt.io))
* OpenID

Personally, I use [JWT](https://jwt.io), because I write web services for our clients ([ATNM](https://www.airtouchmedia.com)), mostly for mobile apps or [CMS](https://en.wikipedia.org/wiki/Content_management_system). If you'd like to read more about the [Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API), Mozilla has a great article that explains it very well.

##### What is JWT ?

> JSON Web Tokens are an open, industry standard [**RFC 7519**](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties.

##### Why you should use JWT ?

> * **Authorization**: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.
> * **Information Exchange**: JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

So, you have to verify the signature, to encode or decode the body, or to compose the JWT body. For this kind of processes I created the file _jwt.helper.go_, to keep a consistency and to find all the code related to JWT in a single place under the package _auth_.

Let's discuss about the other file, from the _auth_ package, _principal.middleware.go_. The file has this name because it is the first middleware in the interaction with any API, so all the requests are coming through it. In this file I write a function which serves as a blocker for any requests, and if the rules are not passed, a **401 status code** will be sent as the response. Now, if you're asking which are those rules, we already talked about JWT, so attached to any request (except endpoints like login, register, which don't need authorization) the client must send an [HTTP header](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields), **Authorization**, which must contain the JWT token.

As a sum up, if the client app doesn't send a token, or the token is corrupted or invalid, the web service will invalidate the request.

##### Where to get that token from ?

Probably this is a question that you thought of while reading the previous paragraph, so let's make this clear. I mentioned that on login or register (and yes, probably other routes as well don't require authentication) you don't need to send a token, because you will actually get the token from these requests. So you fill in your credentials, and if they are right, you'll get a token in the response, on login, which will be sent for each request that imposes it.

## /cmd

I always prefer to put the _main.go_ file in this package, which contains all the sub packages from a project. It's like a wrapper which encapsulate all the submodules, to work all together.

**Why is name like that ?** It's simple, because _cmd_ is short for command.

**What to understand through command?**  A command represents a task which is part of something, call other tasks, or run independently. The _main.go_ file is a command which usually wraps all the functions and packages of a web service in a single file and calls just the main functions of any package. At any moment, if you want to remove a functionality, you can simply remove it just by commenting the instance from the main file.

## /config

This package is very important in my opinion, because I found it very useful to keep all the configs in a single place and not search around in all the files of the project. In this package, I usually write a file called _config.go_ which contains the model for the configuration. This model is nothing more than a [structure](https://gobyexample.com/structs), for example:

```go
type JWT struct {
	Secret string `required:"true"`
}

type Database struct {
	Dialect  string `default:"postgres"`
	Debug    bool   `default:"false"`
	Username string `required:"true"`
	Password string `required:"true"`
	Host     string `required:"true"`
	Port     int
	SSLMode bool
}

type Configuration struct {
	Database Database `required:"true"`
	JWT      JWT      `required:"true"`
}
```

But this, is just the structure definitions and we still need the real data to be placed somewhere. For that part I prefer to have multiple [JSON files](https://json.org), depends by environment and to name them like `config.ENV.json`. For the structs defined before a dummy JSON example is the following:

```json
 {
    "Database": {
        "Dialect": "postgres",
        "Debug": true,
        "Username": "postgres",
        "Password": "pass",
        "Host": "example.com",
        "Port": 5432,
        "SSLMode": true,
    },
    "JWT": {
        "Secret": "abcdefghijklmnopqrstuvwxyz"
    }
}
```

Let's talk about business, because this part is very special for me and very important for the time invested in finding the best answer. I don't know if you faced this problem or not, or for you, maybe it is not a problem, but I really encountered some problems trying to import the config in a good way. There are many possibilities, but I had to face the dilemma to choose between two:

* passing the config object as a variable from main.go to the final function, where I need to use it. This for sure is a good idea, because I pass that variable just for those instances which need it, so in this way I don't compromise speed quality. But this is very time consuming for development or refactoring, because I need to pass the config from one function to another one all the time, so in the end, you want to kill yourself, meeh.., maybe not, but I still don't like it.
* declaring a global variable and using that instance everywhere I need. But this is not the best option at all in my opinion, because I have to declare a variable, for example in main.go file, and later in the main function I need to `Unmarshal()` the JSON file, to put that content into the variable object declared as global. But guess what, maybe I'm trying to call that object before it's initialization is ready, so I'll have an empty object, with no real values, so in this case my app will crash.
* inject the config object directly where I need, and yes, this is my best option which fits perfectly with me. In _config.go_ file, at the end of it, I declare the following lines:

```go
var Main = (func() Configuration {

	var conf Configuration
	if err := configor.Load(&conf, "PATH_TO_CONFIG_FILE"); err != nil {
		panic(err.Error())
	}
	return conf
})()
```

What you need to know for this implementation is that I use a library called [Configor](https://github.com/jinzhu/configor) which unmarshals a file, in our case a JSON, and loads it into a variable `conf`, which is returned.

Any time when you need to use something from the config, it's enough to type the package name, which is `config`, and to call the variable `Main`, as the following example which retrieves the configuration for the database:

```go
var myDBConf = config.Main.Database
```

**!!!Tips**: As you can see, you must insert there the path to your config file, but because you want to have a different file for different environments, maybe you can set an environment variable called `CONFIG_PATH`. Define that as an env variable, or put it before you run your go like:

```bash
CONFIG_PATH=home/username/.../config.local.json go run cmd/main.go
```

And instead of `PATH_TO_CONFIG_FILE` put `os.Getenv("CONFIG_PATH")`. This way, it doesn't where the path to your file is.. so you can skip some operating system errors.

## /db

I like to keep my database connection logic and API handlers completely separate.

* about db.go
* about service.go
* i preffer to use gorm talk about it

### /db/models

* what is a model

### /db/handlers

* this are queries .. but functions that will repeat all over the WS boilerplate code

## /gen

Sometimes we use tools like swagger which generate some code.. will be easier to keep all that code in a single place

## /locales

sometimes I need to have some translations for error messages or others .. depends by user's language preference

about gotrans [https://github.com/bykovme/gotrans](https://github.com/bykovme/gotrans "https://github.com/bykovme/gotrans")

## /public

* email templates
* reset password form

## /utils

here is the place where to put all the "tools" that helps you

## /vendor

to keep all dependences together I use dep so where to place all those dependences if not in a folder like this

about dep [https://github.com/golang/dep](https://github.com/golang/dep "https://github.com/golang/dep")

**--leave me some comments ... --**