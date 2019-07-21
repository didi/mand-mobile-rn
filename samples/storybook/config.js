// The config file use storybook for React
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { setConsoleOptions } from '@storybook/addon-console'
import {
  storiesOf,
  configure,
  addDecorator,
  addParameters,
} from '@storybook/react'
import {
  Global,
  ThemeProvider,
  themes,
  createReset,
  convert,
  create,
} from '@storybook/theming'
import { addReadme, configureReadme } from 'storybook-readme'
import { createStylesheet } from './iconhelper'
import GeneralMD from './GENERAL.md'
import './styles.css';

setConsoleOptions({
  panelExclude: [],
})

configureReadme({
  StoryPreview: ({ children }) => (<div style={{
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#333',
    backgroundColor: "#ededed"
  }}>{children}</div>),
  DocPreview: ({ children }) => (
    <div style={{ padding: 20 }}> {children}</div>
  ),
});

addParameters({
  readme: {
    codeTheme: 'atom-dark',
    content: GeneralMD,
  },
});

addDecorator(addReadme)

addDecorator(withKnobs)

addDecorator((storyFn) => (
  <ThemeProvider theme={convert(themes.light)}>
    <Global styles={createReset} />
    {storyFn()}
  </ThemeProvider>
))

const _theme = create({
  base: 'light',

  // UI
  appBg: 'white',
  appBorderRadius: 0,

  brandTitle: 'Mand Mobile RN',
});

addParameters({
  viewport: { defaultViewport: 'iphonexsmax' },
  options: {
    theme: _theme,
    isFullscreen: false,
    showNav: true,
    panelPosition: 'right',
    sortStoriesByKind: false,
    enableShortcuts: true,
    sidebarAnimations: false,
  },
})

let previousExports = {}
if (module && module.hot && module.hot.dispose) {
  ; ({ previousExports = {} } = module.hot.data || {})

  module.hot.dispose((data) => {
    // eslint-disable-next-line no-param-reassign
    data.previousExports = previousExports
  })
}

// The simplest version of examples would just export this function for users to use
function importAll(context) {
  const storyStore = window.__STORYBOOK_CLIENT_API__._storyStore // eslint-disable-line no-undef, no-underscore-dangle

  context.keys().forEach((filename) => {
    const fileExports = context(filename)

    // A old-style story file
    if (!fileExports.default) {
      return
    }

    const { default: component, ...examples } = fileExports
    let componentOptions = component
    if (component.prototype && component.prototype.isReactComponent) {
      componentOptions = { component }
    }
    const kindName =
      componentOptions.title || componentOptions.component.displayName

    if (previousExports[filename]) {
      if (previousExports[filename] === fileExports) {
        return
      }

      // Otherwise clear this kind
      storyStore.removeStoryKind(kindName)
      storyStore.incrementRevision()
    }

    // We pass true here to avoid the warning about HMR. It's cool clientApi, we got this
    const kind = storiesOf(kindName, true)

      ; (componentOptions.decorators || []).forEach((decorator) => {
        kind.addDecorator(decorator)
      })
    if (componentOptions.parameters) {
      kind.addParameters(componentOptions.parameters)
    }

    Object.keys(examples).forEach((key) => {
      const example = examples[key]
      const { title = key, parameters } = example
      kind.add(title, example, parameters)
    })

    previousExports[filename] = fileExports
  })
}

function loadStories() {
  // import docs first
  const docs = require.context('./stories/docs', true, /\.stories\.js$/)
  importAll(docs)
  const req = require.context('./stories', true, /\.stories\.js$/)
  importAll(req)
}

configure(loadStories, module)

// Generate required css
// Inject font to storybook webpage.
const MandMobile = require('../../dist/assets/fonts/mand-mobile.ttf')

const fontSets = {
  MandMobile,
}

for (const [key, value] of Object.entries(fontSets)) {
  let fontFamilyName = key
  if (key === 'MandMobile') {
    fontFamilyName = 'mand-mobile'
  }
  const fontface = `@font-face {
    src: url(${value});
    font-family: ${fontFamilyName};
  }`
  const style = createStylesheet(fontface)
  document.head.appendChild(style)
}
