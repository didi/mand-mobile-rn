import 'react-native-mock-render/mock'
import { NativeModules } from 'react-native'

const { jsdom } = require('jsdom')

global.document = jsdom('')
global.window = document.defaultView
global.navigator = {
  userAgent: 'node.js',
}

NativeModules.MDNumberKeyboard = {
  remove: jest.fn(),
  setup: jest.fn(),
}

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    )
  Object.defineProperties(target, props)
}
copyProps(document.defaultView, global)

function suppressDomErrors() {
  const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser|PascalCase)/
  // eslint-disable-next-line no-console
  const realConsoleError = console.error
  // eslint-disable-next-line no-console
  console.error = (message) => {
    if (message.match(suppressedErrors)) {
      return
    }
    realConsoleError(message)
  }
}
suppressDomErrors()
