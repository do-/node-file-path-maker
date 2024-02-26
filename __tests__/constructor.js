const {FilePathMaker} = require ('..')

test ('bad', () => {

	expect (() => new FilePathMaker ()).toThrow ('No options')
	expect (() => new FilePathMaker (1)).toThrow ('object')
	expect (() => new FilePathMaker ({})).toThrow ('not set')
	expect (() => new FilePathMaker ({root: 0})).toThrow ('must be a string')
	expect (() => new FilePathMaker ({root: '.'})).toThrow ('absolute')

})