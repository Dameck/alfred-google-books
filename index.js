/* eslint-disable no-unused-vars */
'use strict';
const os = require('os');
const fs = require('fs');
const del = require('del');
const alfy = require('alfy');
const join = require('join-array');
const moment = require('moment');
const tempDir = require('temp-dir');
const download = require('download');

const q = `q=${alfy.input}`;
const tempImageDir = `${os.tmpdir()}/alfred-google-books/`;

function buildSubtitle(info) {
	const list = [info.authors, info.publisher, info.publishedDate];
	const subtitle = list.filter(Boolean);
	return join(subtitle, ' | ', ' | ');
}

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
			subtitle: buildSubtitle(item.volumeInfo),
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
