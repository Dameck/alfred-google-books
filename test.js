/* eslint-disable no-script-url */
import test from 'ava';
import alfyTest from 'alfy-test';

test(async t => {
	const alfy = alfyTest();
	const result = await alfy('The Art of Computer Programming');

	t.deepEqual(result[0], {
		arg: 'http://books.google.com/books?id=x9AsAwAAQBAJ&printsec=frontcover&dq=q%3DThe+Art+of+Computer+Programming&hl=&cd=1&source=gbs_api',
		title: 'The Art of Computer Programming',
		subtitle: 'Donald E. Knuth | Addison-Wesley Professional | 1997-07-04',
		quicklookurl: 'http://books.google.com/books/content?id=x9AsAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
		icon: {
			path: '/tmp/alfred-google-books/x9AsAwAAQBAJ.jpg'
		}
	});
});
