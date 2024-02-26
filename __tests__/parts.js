const path = require ('path')
const {FilePathMaker} = require ('..')

test ('basic', () => {

	const fpm = new FilePathMaker ({root: path.resolve ('.')})

	expect (fpm.getParts ().join ('-')).toBe (new Date ().toISOString ().slice (0, 10))

})

test ('format', () => {

	const fpm = new FilePathMaker ({root: path.resolve ('.'), format: {year: '2-digit', month: '2-digit'}})

	expect (fpm.getParts ().join ('-')).toBe (new Date ().toISOString ().slice (2, 7))

})