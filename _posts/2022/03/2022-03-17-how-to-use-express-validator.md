---
title: How to use express validator?
summary: How to use express validator through full examples. I found express validator very powerful, but having a poor documentation.
categories: tutorials
tags: express nodejs validator
date: 2022-03-17 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_1280.png
redirect_from:
- /webservice/how-to-use-express-validator/
layout: post
---

How to use express validator through full examples. I found express validator very powerful, but having a poor documentation. I decided to offer some examples that are very common and probably mainly searched.

The official documentation can be checked on [Express Validator Documentation](https://express-validator.github.io/docs/) .

## Validate nested object using express validator

Sometimes you need to validate an object. If the object is required that's simple:

```js
req.body = {
    user: {
        email: "email@test.com",
        password: "pass"
    }
}
```

the validator looks like:

```js
app.post(
  '/user',
  // user is a required object
    body('user').exists().isObject(),
  // email must be an email
    body('user.email').exists().isEmail(),
  // password must be at least 5 chars long
    body('user.password').exists().isLength({ min: 3 }),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next()
  },
);
```

What happens if the user object is optional, but if present email and password are required?

```js
app.post(
  '/user',
  // user is a required object
    body('user').exists().isObject(),
  // email must be an email
    body('user.email')
        .if(body('user').exists()) // check if user property exists
        .exists() // then check user.email to exists
        .isEmail(),
  // password must be at least 5 chars long
    body('user.password')
        .if(body('user').exists())
        .exists().isLength({ min: 3 }),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next()
  },
);
```