/* eslint-disable no-script-url, no-useless-escape, quotes */
import test from 'ava';
import alfyTest from 'alfy-test';

test(async t => {
	const alfy = alfyTest();
	const result = await alfy('The Art of Computer Programming');

	t.deepEqual(result[0], {
		arg: 'http://books.google.de/books?id=cYULBAAAQBAJ&pg=PA57&dq=q%3DThe+Art+of+Computer+Programming&hl=&cd=1&source=gbs_api',
		title: 'The Art of Computer Programming',
		subtitle: 'Donald E. Knuth | Addison-Wesley Professional | 1998-04-24',
		quicklookurl: 'http://books.google.de/books?id=cYULBAAAQBAJ&pg=PA57&dq=q%3DThe+Art+of+Computer+Programming&hl=&cd=1&source=gbs_api',
		icon: {
			path: '/tmp/alfred-google-books/cYULBAAAQBAJ.jpg'
		}
	});
});
