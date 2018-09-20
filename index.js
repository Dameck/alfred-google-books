/* eslint-disable no-unused-vars */
'use strict';
const os = require('os');
const fs = require('fs');
const del = require('del');
const join = require('join-array');
const tempDir = require('temp-dir');
const download = require('download');
const {fetch, input, output} = require('alfy');

const q = `q=${input}`;
const url = 'https://www.googleapis.com/books/v1/volumes';
const tmp = `${os.tmpdir()}/alfred-google-books/`;
const options = {
	method: 'GET',
	query: {
		q
	}
};

const buildSubtitle = item => {
	const list = [item.volumeInfo.authors, item.volumeInfo.publisher, item.volumeInfo.publishedDate];
	const subtitle = list.filter(Boolean);
	return join(subtitle, ' | ', ' | ');
};

if (!fs.existsSync(tmp)) {
	fs.mkdirSync(tmp);
}

fetch(url, options)
	.then(data => {
		if (data.totalItems === 0) {
			return [{
				title: `No Google Books were found that mached "${input}"`,
				subtitle: 'Click to see the results for yourself',
				arg: url + '?' + q
			},
			{
				title: 'Go to website',
				subtitle: 'https://books.google.com/',
				arg: 'https://books.google.com/'
			}];
		}

		data.items.map(item => {
			return download(item.volumeInfo.imageLinks.thumbnail).then(data => {
				fs.writeFileSync(`${tmp}${item.id}.jpg`, data);
			});
		});

		return data.items.map(item => {
			return {
				arg: item.volumeInfo.previewLink,
				title: item.volumeInfo.title,
				subtitle: buildSubtitle(item),
				quicklookurl: item.volumeInfo.imageLinks.thumbnail,
				icon: {
					path: `${tmp}${item.id}.jpg`
				}
			};
		});
	})
	.then(output)
	.then(() => del([`${tmp}*.jpg`], {force: true}));
