![workflow](https://github.com/do-/node-file-path-maker/actions/workflows/main.yml/badge.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

`file-path-maker` is an npm module for organizing a steady flow of incoming files in a predictably growing tree of directories.


# Description

Suppose an information system have to store about `N` files per day (hour, second etc.) in arbitrary directories under a common root. Once written, files are never modified, but their retention time is limited to `T` years (months etc.) after which all expired content must be deleted or compressed, moved to other media and so on.

The obvious solution for this is to have one directory per year, subdivided by month etc. Leaf directories correspond to the smallest time unit in use. They should contain the greatest number of files comfortable to work with at once. The exact choice depends on the flow rate, the retention time and the file system capabilities.

To implement such logic, `file-path-maker` provides the `FilePathMaker` class with the single API method called `make` that calculates paths like `${root}/${prefix}/${yyyy}/${mm}/${dd}/.../${file}.${ext}` while creating necessary directories on the fly.

# Installation
```
npm install file-path-maker
```
# Usage
```js
const {FilePathMaker} = require ('file-path-maker')

const fpm = new FilePathMaker ({
     root   :  '/var/filestore',
  // mode   :  0o777, 
  // format :  {year: 'numeric', month: '2-digit', day: '2-digit'},
})

const {
  rel,   //                `daily/${yyyy}/${mm}/${dd}/docs/file.ext`
  dir,   // `/var/filestore/daily/${yyyy}/${mm}/${dd}/docs`
  abs,   // `/var/filestore/daily/${yyyy}/${mm}/${dd}/docs/file.ext`
} = fpm.make ('docs/file.ext', 'daily')
```

# Constructor Options
| Name  | Description |
| ----  | ----------- |
|`root` | The absolute path of a directory containing all `make` results |
|`mode` | The newly created directories mode, see [fs.mkdir](https://nodejs.org/docs/latest/api/fs.html#fsmkdirpath-options-callback) |
|`format ` | `Intl.DateTimeFormat` constructor [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) |

# The `make` method
## parameters
| Name | Description | Note
| ----  | ----------- | - |
| `path` | The path to append last | Mandatory
| `prefix` | The string to place between the `root` and the date based part | Optional

## result properties
| Name  | Description | Note |
| ----  | ----------- | ---- |
|`abs`  | The absolute generated path | [path.sep](https://nodejs.org/docs/latest/api/path.html#pathsep) as delimiter
|`rel`  | The generated path relative to `root` | `'/'` as delimiter
|`dir`  | The absolute directory name of the generated path | guaranteed to exist

# Limitations

`file-path-maker` never checks for existing files nor path uniqueness. Subsequent `make ('1.txt')` calls may very well give identical results, so writing different content by those path will lead to data loss. It's up to the application to implement necessary checks, locking, using globally unique names and so on.

The `make ()` method is synchronous and uses [fs.mkdirSync](https://nodejs.org/docs/latest/api/fs.html#fsmkdirsyncpath-options) internally. Potentially, this may lead to some performance issues.
