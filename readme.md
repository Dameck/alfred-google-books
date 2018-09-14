# alfred-google-books [![Build Status](https://travis-ci.org/Dameck/alfred-google-books.svg?branch=master)](https://travis-ci.org/dameck/alfred-google-books)

> Alfred 3 workflow to search for Google Books on https://books.google.com/

<img src="media/screenshot.png" width="694">


## Install

```
$ npm install --global alfred-google-books
```

*Requires [Node.js](https://nodejs.org) 4+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*


## Why you downloading book cover pictures?
Because Alfred3 doesn't support URLs in the icon displayed in the result row.

Only three kinds of icon are supported. You can pass the path to an actual image file, e.g.
```json
"icon":{"path":"./icon.png"}
```
you can pass the path to a file whose icon you'd like to use, e.g.
```json
"icon":{"path":"/Applications/Safari.app", "type":"fileicon"}
```
to show Safari's icon, or you can pass a file type in the form of a UTI, e.g.
```json
"icon":{"path":"public.folder", "type":"filetype"}
```
to show the standard folder icon.


## Usage

In Alfred, type `gb`, <kbd>Enter</kbd>, and your query.

## License

MIT © [Damian Framke](http://www.bytesolutions.de)

*Contributions and feedback are welcome and encouraged!*
