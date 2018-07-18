# gemini-selenium

This is a `gemini` plugin that starts `selenium` before running tests.

## Installation
`npm install gemini-selenium`

## Configuration
**successCriteria** (optional) – `RegExp` – RegExp of successful starting of standalone Selenium Server; ` /main: Started.*HTTP/` by default.  It's useful for support latest version of `selenium-standalone`.

```yml
system:
    plugins:
      selenium: {
                successCriteria: /Selenium Server is up and running on port (\d+)/
            },
```
