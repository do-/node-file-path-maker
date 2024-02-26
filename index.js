const path = require ('path')
const fs = require ('fs')

module.exports = {

	FilePathMaker: class {

		constructor (o) {

			if (!o) throw Error ('No options set')
			
			if (typeof o !== 'object') throw Error ('Options must be set as an object')

			if (!('root' in o)) throw Error ('The root is not set')

			if (typeof o.root !== 'string') throw Error ('The root must be a string')

			if (!path.isAbsolute (o.root)) throw Error ('The root must be an absolute path')

			this.root = o.root
			this.mode = o.mode

			this.format = new Intl.DateTimeFormat ('sv', o.format)

		}

		getParts () {

			return this.format.formatToParts (new Date ())
				.filter (i => i.type !== 'literal')
				.map (i => i.value)

		}

		make (p, prefix = '') {

			if (typeof p !== 'string') throw Error ('Path must be a string')
			
			if (p.length === 0) throw Error ('Empty path')

			if (prefix && typeof prefix !== 'string') throw Error ('Prefix must be a string')

			let rel = prefix

			const parts = this.getParts (); for (const part of parts) {

				if (rel.length !== 0) rel += '/'

				rel += part

			}

			rel += '/'; rel += p

			const abs = path.join (this.root, rel)

			const dir = path.dirname (abs)

			const {mode} = this

			fs.mkdirSync (dir, {mode, recursive: true})

			return {rel, abs, dir}

		}

	}

}