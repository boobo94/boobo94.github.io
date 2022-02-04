---
title: Web Service Architecture for Golang Developers
layout: post
categories: webservice
date: 2018-09-26 19:07:54 +0000
summary: The web service architecture it's one of the most important part from your
  project. Learn how to create APIs, take care of security, interact with the database,
  write tests, use translations and manage the deployment process simply by using
  Golang.
keywords: web service architecture, software architecture, golang, apis
tags:
- webservice
- software-architecture
- software
- architecture
- golang
- go
- models
cover: https://cdn.pixabay.com/photo/2016/08/05/07/17/laptop-1571702_1280.jpg
---

Web service architecture is the first phase before building every project, it's like you prepare to build a house and start by creating the architecture plan.

This article will present how I structure my projects when I need to create a simple web service in Golang. It's very important for you to keep a simple but intuitive architecture, because as you know, in golang you can call methods by referencing the package name.

In the following lines I'll present a simple, but traditional model of web service [architecture](/webservice/setup-custom-service-ubuntu/) used by me in most of the projects that I'm involved in, treating each individual web service's component.

## /api

<img src="https://cdn.pixabay.com/photo/2014/06/05/17/42/track-362874_1280.jpg" alt="api" style="width: 40%" />

The API package is the folder where all the API endpoints are grouped into sub-packages by the purpose they serve. That means, I prefer to have a special package with it's main scope to solve a specific problem.

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
    ├── db
    │   ├── handlers
    │   ├── models
    │   ├── tests
    │   ├── db.go
    │   └── service.go
    ├── locales
    │   ├── en.json
    │   └── fr.json
    ├── public
    ├── vendor
    ├── Makefile
    ..........................

#### handler.go

As you can see, there is a **handler.go** suffix in the name of the files. In these you can effectively write the code, which will handle the request, where the data requested will be retrieved from the [database](/tutorials/postgres-ubuntu-setup/), processed and in the end the response will be composed.

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

In the interaction between a client and a web service, they are sending and receiving data, but at the same time, there is probably a third party [API](/webservice/RESTful-api-resources/) involved, another application, or the database. Having this in mind, before transferring the data from an application to another one, we need to convert the format, before being accepted by the new app. This conversion function can be written here, in this _adapter.go_ file.

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

func ConvertAToB(obj A) B {
	return B{
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

Personally, I use [JWT](https://jwt.io), because I write web services for our clients ([ATNM](https://www.airtouchmedia.com)), mostly for [mobile apps](https://whyboobo.com/portfolio/2021-01-01-public-law-mobile-app/) or [CMS](https://en.wikipedia.org/wiki/Content_management_system). If you'd like to read more about the [Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API), Mozilla has a great article that explains it very well.

<img src="/images/jwt.png" alt="jwt" />

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

I always prefer to put the _main.go_ file in this package, which contains all the sub packages from a project. It's like a wrapper which encapsulate all the submodules, to [work](/portfolio/) all together.

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
 $ CONFIG_PATH=home/username/.../config.local.json go run cmd/main.go
```

And instead of `PATH_TO_CONFIG_FILE` put `os.Getenv("CONFIG_PATH")`. This way, it doesn't where the path to your file is.. so you can skip some operating system errors.

## /db

This **db** package is one of the most important from your web service and you really have to invest a big amount of time thinking at the architecture and developing the package because it's one of the purposes of a web service, collecting and storing data. In the following lines I present my own version which fit perfectly in most of the cases when I build a web service, so stay tuned..

Before going deeper into folder structure I have two confess you that I prefer to use an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping), because it's much easier and offers a good approach working with objects than to work with SQL queries and convert that data into arrays and try to debug a simple query. I use [GORM](https://github.com/jinzhu/gorm) because fulfill all me requirements: have all the basic ORM functions (Find, Update, Delete, etc..), accept associations (Has One, Has Many, Belongs To, Many To Many, Polymorphism), accept transactions, have sql builder, have Auto Migrations and other cool features.

### /db.go

I have this file to keep all the important configuration for GORM. So in this file I make a function which return a connection to database as object and this function will be called in _main.go_ and passed to all APIs which need interaction with database.

```go
// NewDatabase returns a new Database Client Connection
func NewDatabase(config *config.Database) (*gorm.DB, error) {
	db, err := gorm.Open(config.Dialect, config.Source)
	if err != nil {
		return nil, err
	}

	if err := InitDatabase(db, config); err != nil {
		return nil, err
	}

	return db, nil
}
```

As you can see inside NewDatabase, on line 8, it's called a function `InitDatabase()`, this function define the behavior of my ORM and action the AutoMigration

```go
// InitDatabase initializes the database
func InitDatabase(db *gorm.DB, config *config.Database) error {
	db.LogMode(config.Debug)

	// auto migrate
	models := []interface{}{
		&models.Account{},
		&models.PersonalInfo{},
		&models.Category{},
		&models.Subcategory{},
	}
	if err := db.AutoMigrate(models...).Error; err != nil {
		return err
	}

	// Personal info
	if err := db.Model(&models.PersonalInfo{}).AddForeignKey("account_id", fmt.Sprintf("%s(id)", models.AccountTableName), "CASCADE", "CASCADE").Error; err != nil {
		return err
	}

	// Subcategories
	if err := db.Model(&models.Subcategory{}).AddForeignKey("category_id", fmt.Sprintf("%s(id)", models.CategoryTableName), "CASCADE", "CASCADE").Error; err != nil {
		return err
	}

	return nil
}
```

The Auto Migration verify if the tables exist and if not or the model is different will try to make a sync.

Except Auto Migration I set manually the foreign keys or if it's needed, index or other sql constraints.

A simple example of instantiation in main.go looks like:

```go
	// setup the database
	dbc, err := db.NewDatabase(&config.Config.Database)
	if err != nil {
		panic(err.Error())
	}
```

### /service.go

The purpose of this file is to keep a structure for all the handlers and instead to import a handler in multiple places or to keep an inconsistency to pass just a single object from _main.go_  to all API handlers which contains a reference to all handlers of database. So this file looks like:

```go
package db

import (
	"github.com/jinzhu/gorm"
	"PROJECT_FOLDER/db/handlers"
)

type Service struct {
	Account  *handlers.AccountHandler
	Category *handlers.CategoryHandler
}

func NewService(db *gorm.DB) Service {
	return Service{
		Account:  handlers.NewAccountHandler(db),
		Category: handlers.NewCategoryHandler(db),
	}
}
```

As you can see here I have just two handlers which not contains PersonalInfo and Subcategory, because this are not needed, being part from the main handlers. You don't need for example the personal information without knowing the account assigned to it, so both will be wrapped in one object.

This can be simply called in _main.go_ like below:

```go
	// create the database service
	dbService := db.NewService(dbc)
```

### /db/models

> [Models](http://gorm.io/docs/models.html) are usually just normal Golang structs, basic Go types, or pointers of them.

As you can see I put in the auto migration function 4 models Account, PersonalInfo, Category and Subcategory. I like to define each model into a different file, choosing an intuitive name like _account.go_, _personalInfo.go_, _category.go_ and _subcategory.go_.

And just as an example, the content of account.go will look like:

```go
package models

import (
	"crypto/md5"
	"encoding/hex"
	"PROJECT_FOLDER/utils"

	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type Role string

const (
	RoleAdmin Role = "admin"
	RoleUser  Role = "user"
)

const (
	AccountTableName = "accounts"
)

type Account struct {
	gorm.Model

	Username string `gorm:"type:varchar(100); unique; not null"`
	Password string `gorm:"not null"`
	Role     Role   `gorm:"type:varchar(5); not null"`
	Active   bool   `gorm:"not null"`
	Token    string `gorm:"not null"`

	IsSocial     bool `gorm:"not null"`
	Provider     string
	PersonalInfo PersonalInfo
}

func (account *Account) BeforeCreate() error {
	password, err := HashPassword(account.Password)
	if err != nil {
		return err
	}
	account.Password = *password
	account.Token = GenerateToken()

	return nil
}

func HashPassword(password string) (*string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	pass := string(hash)
	return &pass, nil
}

func GenerateToken() string {
	hasher := md5.New()
    
	// you can check the utils.RandStr() in /utils chapter of this article
	hasher.Write([]byte(utils.RandStr(32)))

	return hex.EncodeToString(hasher.Sum(nil))
}
```

### /db/handlers

A handler for database represents a boilerplate code which it's repeated in multiple places, so instead to call GORM functions, it's better to call a function which prepare the response to be used inside the API handlers.

```go
package handlers

import (
	"PROJECT_FOLDER/db/models"

	"fmt"

	"github.com/jinzhu/gorm"
)

type AccountHandler struct {
	db *gorm.DB
}

func NewAccountHandler(db *gorm.DB) *AccountHandler {
	return &AccountHandler{
		db,
	}
}

func (h *AccountHandler) Find(accountID uint) (*models.Account, error) {
	var res models.Account

	if err := h.db.Find(&res, "id = ?", accountID).Error; err != nil {
		return nil, err
	}

	return &res, nil
}

func (h *AccountHandler) FindBy(cond *models.Account) (*models.Account, error) {
	var res models.Account

	if err := h.db.Find(&res, cond).Error; err != nil {
		return nil, err
	}

	return &res, nil
}

func (h *AccountHandler) Update(account *models.Account, accountID uint) error {
	return h.db.Model(models.Account{}).Where(" id = ? ", accountID).Update(account).Error
}

func (h *AccountHandler) Create(account *models.Account) error {
	return h.db.Create(account).Error
}

func (h *AccountHandler) UpdateProfile(profile *models.PersonalInfo, accountID uint) error {
	var personalInfo models.PersonalInfo
	cond := &models.PersonalInfo{
		AccountID: accountID,
	}

	// only create it if it doesn't already exist
	if h.db.First(&personalInfo, cond).RecordNotFound() {
		profile.AccountID = accountID
		return h.db.Create(profile).Error
	}

	return h.db.Model(models.PersonalInfo{}).Where(cond).Update(profile).Error
}
```

If you want an example of an SQL package handler I recommend you [SQLHandler](https://github.com/Xzya/sqlhandler) from [XZYA](https://github.com/Xzya).

### /db/tests

I know probably you project manager can skip this step, because the project must be prepared as sooner as possible, but trust me, it's better to write tests. So a good package for Go, in my opinion, to write Unit Tests is [Testify](https://github.com/stretchr/testify), it's very simple to use it and very powerful.

## /gen

Gen folder is that folder where all the code generated by third party libraries  is placed in. It's very simple to keep all that code inside a single place, because maybe.. you need to clean it by time to time, before to generate a new version and you can do that by simply using a [Makefile](https://en.wikipedia.org/wiki/Makefile) task, we will discuss about that, later.

At work, we usually use [Swagger](https://swagger.io), a tool that makes our life easier and helps us to maintain a single file which serves as base for [APIs declaration](https://editor.swagger.io/?_ga=2.19720637.408907328.1539089399-1459746301.1538552745), [code generation](https://github.com/swagger-api/swagger-codegen) and documentation. But because Swagger is so cool and we are just human, it's much simple to use a graphical interface than to write [YAML](https://en.wikipedia.org/wiki/YAML) or JSON spec files. For that kind of job we use [StopLight](https://stoplight.io). What it does,  basically offers a graphic interface and after the work is done to export your desired spec file.

## /locales

In the most of the time, the translations are implemented by the client app, but maybe sometimes you need to send some custom errors or some translated email templates and you face a problem. I had this dilemma at some point in my carrier as Go Developer and I had the option to build something very simple and very basic or to look through the existing packages maybe one it fits for me. And yes I found one very simple, but exactly what I need. I wanted a simple package which can read a JSON file, because the client app already had these translations and in this way I didn't had to create something extra so I discovered [GoTrans](https://github.com/bykovme/gotrans). What is cool about this package it's that you can declare it for example in the _cmd/main.go_ and then you can just call the translate function wherever you want inside the project.

### How to initialize Gotrans?

```go
	// initialize locales
	if err := gotrans.InitLocales("locales"); err != nil {
		panic(err)
	}
```

### How to use Gotrans ?

JSON files looks like:

```json
{
    "hello_world":"Hello World",
    "find_more":"Find more information about the project on the website %s"
}
```

> JSON file name should use standard language code or language-country code supported by browsers. At least one file "en.json" should be in the localization folder.

```go
 gotrans.Tr("fr", "hello_world")
```

## /public

Probably you asked yourself _Whatt?! A public folder inside a webservice ?!_ Yeah, that's true, maybe not all the time you need it, but I'm trying to explain as much I can a general architecture for web services and occasionally you need to have like _Terms and conditions_ page or _Privacy Policy_ or HTML mail templates or whatever can be public and can be exported as a resource on a public API.

## /utils

Building a big project, sometimes require extra tools or let's say helpers to solve little problems. But these [helpers](/tips/5-questions-build-custom-alexa-skill//) are just small piece of code, so is not needed to create a separated package just for a simple and small piece of code. So yeah, **utils** package make the trick, because you can put here into separated files different code to make for example things like:

* generate a random token

```go
var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandStr(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}
```

* generate a hash password
* creating handlers to upload in Cloud
* creating handlers to send emails
* manager for logs
* etc..

Basically here it's the place where with store all your mess which cannot be categorized, but it's more than a mess, because this mess makes your life easier and probably helps you to save time, by not repeating to write the same code in many places.

## /vendor

This folder is the only place that you don't necessary need to change something, here all the external dependences or packages imported in your project are downloaded and stored in order to make you build working. This is automatically created on `build` or `run` task, because before your project to be compiled, it verify if all the imports are in vendor folder.

### How can you download a package ?

Here are multiple right answers and I don't want to go into polemics, but I can tell you that the default one is `go get PACKAGE` which will put the [dependencies](https://stackoverflow.com/questions/37237036/how-should-i-use-vendor-in-go-1-6) in `$GOPATH/src` or `go install PACKAGE` which will put the binaries in `$GOPATH/bin` and packages in `$GOPATH/pkg`.

### How to manage packages ?

Probably your question now it's _"Ok, but how can I keep all dependencies together and to install them with a simple command, instead to run multiple commands, if I need to change the environment for example ?"_ and the answer it's very simple, use a management dependency tool. With a dependency tool you can achieve basic tasks and you can save some time.

I prefer [**DEP**](https://github.com/golang/dep), the default one from Golang.

<img src="https://github.com/golang/dep/raw/master/docs/assets/DigbyShadows.png" alt="dep management dependecy tool" style="width: 40%" />

It can be install simple with brew for MAC

```bash
 $ brew install dep
 $ brew upgrade dep
```

or with CURL

```bash
 $ curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
```

## Makefile

I use make file, because it's simple and can automatize some tasks that I have to repeat from time to time and because I have to make some steps before to create for example a build and I need to do this process after few months or maybe years, probably I need to spend some time figuring out how to do that build. But instead to spend all that time discovering again how should I build my project, I can do it when that information is hot and after that I just need to look inside the make file and to choose what task I need to run.
I want to share with you some simple and basic tasks that I use in the most of my projects:

```make
IP = "XXX.XXX.XXX.XXX"
PEM_FILE = "...PATH_TO_PEM/key.pem"

# Run the server
run:
	CONFIG=config/config.local.json go run cmd/main.go --port 8000

# Remove generated files under gen/ folder
clean:
	rm -r gen

serve:
	realize start
    
# Build
build:
	go build cmd/main.go
    
# Build for linux
build-linux:
	env GOOS=linux go build cmd/main.go
    
# Deploy just the code to dev
deploy-dev-code: build-linux copy-project

# Full deploy to dev
# With tests and swagger generation
deploy-dev: gen deploy-dev-code

# Copy the project build and dependencies to server
copy-project:
	ssh -i $(PEM_FILE) ubuntu@$(IP) 'sudo service api stop'
	scp -i $(PEM_FILE) -r locales/ ubuntu@$(IP):/home/ubuntu/project_name
	scp -i $(PEM_FILE) main ubuntu@$(IP):/home/ubuntu/project_name
	ssh -i $(PEM_FILE) ubuntu@$(IP) 'sudo service api start'
	rm main
```

You can find a great article about [makefile](https://www.gnu.org/software/make/manual/make.html#toc-Overview-of-make) and how to use it from [GNU.org](https://www.gnu.org).

## Summary

In this article you've learn about APIs and how to build an architecture, how to interact with a database from your web service, how to make a config file, take care of security and permissions between [client and server](/tutorials/setup-apache-host-as-proxy/) with JWT and how to make your life easier using other packages, in the end you learned how to run multiple tasks using a make file.

If you have any question or I you consider that I missed some informations, please leave me a comment.