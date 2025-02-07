# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0](https://github.com/namics/gondel/compare/v0.1.0...v1.0.0) (2019-11-28)


### Bug Fixes

* **core:** prevent plugins from being registered twice when being in different js files ([66aedec](https://github.com/namics/gondel/commit/66aedec)), closes [#48](https://github.com/namics/gondel/issues/48)


### BREAKING CHANGES

* **core:** enhances structure of pluginEvents object to track if a plugin (in another js file) has already been initialized





# [0.1.0](https://github.com/namics/gondel/compare/v0.0.8...v0.1.0) (2019-04-08)

**Note:** Version bump only for package @gondel/plugin-react





## [0.0.8](https://github.com/namics/gondel/compare/v0.0.7...v0.0.8) (2018-11-19)


### Features

* **react-plugin:** Allow to skip the render method for pure linking components ([3e1c4d7](https://github.com/namics/gondel/commit/3e1c4d7))





## [0.0.7](https://github.com/namics/gondel/compare/v0.0.6...v0.0.7) (2018-11-05)


### Bug Fixes

* **core:** Prevent errors during the event handling ([a560c64](https://github.com/namics/gondel/commit/a560c64))





<a name="0.0.6"></a>
## [0.0.6](https://github.com/namics/gondel/compare/v0.0.5...v0.0.6) (2018-09-25)


### Features

* **core:** Allow to type _ctx ([0ee58fe](https://github.com/namics/gondel/commit/0ee58fe))


### BREAKING CHANGES

* **core:** GondelBaseComponent constructor requires a ctx and a componentName argument





<a name="0.0.5"></a>
## [0.0.5](https://github.com/namics/gondel/compare/v0.0.4...v0.0.5) (2018-09-19)

**Note:** Version bump only for package @gondel/plugin-react





<a name="0.0.4"></a>
## [0.0.4](https://github.com/namics/gondel/compare/v0.0.1...v0.0.4) (2018-09-17)


### Bug Fixes

* **@gondel/core:** Rethrow caught errors from promises for better dev tool output ([6de6c5f](https://github.com/namics/gondel/commit/6de6c5f))
* **plugin-react:** Fix a possible invalid type error ([9622d7d](https://github.com/namics/gondel/commit/9622d7d))


### Features

* **plugin-react:** Release the gondel react plugin ([d7c14dd](https://github.com/namics/gondel/commit/d7c14dd))
* Upgrade dependencies ([#13](https://github.com/namics/gondel/issues/13)) ([228c287](https://github.com/namics/gondel/commit/228c287))
