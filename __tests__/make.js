const path = require ('path')
const os = require ('os')
const fs = require ('fs')
const {FilePathMaker} = require ('..')

test ('bad', () => {

	const fpm = new FilePathMaker ({root: path.resolve ('.')})

	expect (() => fpm.make ()).toThrow ()
	expect (() => fpm.make (0)).toThrow ()
	expect (() => fpm.make ('')).toThrow ()
	expect (() => fpm.make ('1.txt', Infinity)).toThrow ()
	
})

test ('basic', () => {

	const root = fs.mkdtempSync (os.tmpdir () + '/')

	const fpm = new FilePathMaker ({root})

	const {abs} = fpm.make ('1.txt')

	fs.writeFileSync (abs, '1')

	expect (fs.readFileSync (abs, 'utf8')).toBe ('1')

	fs.rmSync (root, {recursive: true})
	
})

test ('prefix', () => {

	const root = fs.mkdtempSync (os.tmpdir () + '/')

	const fpm = new FilePathMaker ({root})

	const {abs} = fpm.make ('docs/1.txt', 'daily')

	fs.writeFileSync (abs, '1')

	expect (fs.readFileSync (abs, 'utf8')).toBe ('1')

	fs.rmSync (root, {recursive: true})
	
})