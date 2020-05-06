/* eslint camelcase:0 */

// Import
import { equal } from 'assert-helpers'
import kava from 'kava'
import ignorepatterns from './'

// Tests
kava.suite('ignorepatterns', function (suite, test) {
	const ignoreExpected: { [key: string]: boolean } = {
		// Vim
		'~': true,
		'~something': true,
		'something~': true,
		'something~something': false,

		// Emacs
		'.#': true,
		'.#something': true,
		'something.#': false,
		'something.#something': false,

		// Vi
		'.swp': true,
		aswp: false,
		'something.swp': true,
		'.swpsomething': false,

		// SVN
		'.svn': true,
		asvn: false,
		'something.svn': false,
		'something.svnsomething': false,

		// GIT
		'.git': true,
		agit: false,
		'something.git': false,
		'something.gitsomething': false,

		// HG
		'.hg': true,
		ahg: false,
		'something.hg': false,
		'something.hgsomething': false,

		// DS_Store
		'.DS_Store': true,
		'something.DS_Store': false,
		'something.DS_Storesomething': false,

		// Node
		node_modules: true,
		somethingnode_modules: false,
		somethingnode_modulessomething: false,

		// CVS
		CVS: true,
		somethingCVS: false,
		somethingCVSsomething: false,

		// Thumbs
		'thumbs.db': true,
		thumbsadb: false,

		// Desktop
		'desktop.ini': true,
		desktopaini: false,
	}

	Object.keys(ignoreExpected).forEach(function (str) {
		const resultExpected = ignoreExpected[str]
		const testName =
			(resultExpected ? 'should' : 'should not') + ` match [${str}]`
		test(testName, function () {
			const resultActual = ignorepatterns.test(str)
			equal(resultActual, resultExpected)
		})
	})
})
