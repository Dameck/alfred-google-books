/* eslint-disable no-unused-vars */
'use strict';
const os = require('os');
const fs = require('fs');
const del = require('del');
const alfy = require('alfy');
const tempDir = require('temp-dir');
const download = require('download');

const q = `q=${alfy.input}`;
const tempImageDir = `${os.tmpdir()}/alfred-google-books/`;

alfy.fetch('https://www.googleapis.com/books/v1/volumes', {
	method: 'GET',
	query: {
		q
	}
})
.then(data => {
	if (!fs.existsSync(tempImageDir)) {
		fs.mkdirSync(tempImageDir);
	}

	const items = data.items
	.map(item => {
		return {
			arg: item.volumeInfo.previewLink,
			title: item.volumeInfo.title,
			subtitle: item.volumeInfo.authors + ' | ' + item.volumeInfo.publishedDate,
			quicklookurl: item.volumeInfo.imageLinks.thumbnail,
			icon: {
				path: `${tempImageDir}${item.id}.jpg`
			}
		};
	});

	data.items.map(item => {
		return download(item.volumeInfo.imageLinks.thumbnail).then(data => {
			fs.writeFileSync(`${tempImageDir}${item.id}.jpg`, data);
		});
	});

	alfy.output(items);
	del([`${tempImageDir}*.jpg`], {force: true});
});
