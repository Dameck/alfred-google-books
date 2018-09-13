/* eslint-disable no-script-url */
import test from 'ava';
import alfyTest from 'alfy-test';

test(async t => {
	const alfy = alfyTest();
	const result = await alfy('JavaScript The Good Parts');

	t.deepEqual(result[0], {
		arg: 'http://books.google.com/books?id=PXa2bby0oQ0C&printsec=frontcover&dq=q%3DJavaScript+The+Good+Parts&hl=&cd=1&source=gbs_api',
		title: 'JavaScript: The Good Parts',
		subtitle: 'Douglas Crockford | 2008-05-08',
		quicklookurl: 'http://books.google.com/books/content?id=PXa2bby0oQ0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
		icon: {
			path: '/tmp/alfred-google-books/PXa2bby0oQ0C.jpg'
		}
	});
});
