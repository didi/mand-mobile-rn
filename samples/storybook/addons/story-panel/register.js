// register.js

import React from 'react';
import { Placeholder, Link } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import addons, { types } from '@storybook/addons';
import marked from 'marked';
import highlight from './hightlite';

import styleFactory from './styleFactory';

let insert = styleFactory('highlight-code-theme');

import(`./atom-dark.css`).then(t => {
  insert({
    styles: t.default,
  });
});

const ADDON_ID = 'storyaddon';
const PARAM_KEY = 'storyAddon';
const PANEL_ID = `${ADDON_ID}/panel`;

class StoryPanel extends React.Component {
  state = { value: '' };

  ref = null;

  handleRef = ref => {
    this.ref = ref;
    this.highlight();
  };

  highlight() {
    if (this.ref) {
      highlight(this.ref);
    }
  }

  componentDidMount() {
    const { api } = this.props;
    api.on('story/code', this.onCode);
    api.on(STORY_CHANGED, this.onStoryChange);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off('story/code', this.onCode);
    api.off(STORY_CHANGED, this.onStoryChange);
  }

  onStoryChange = id => {
    const { api } = this.props;
    const params = api.getParameters(id, PARAM_KEY);

    if (params && !params.disable) {
      const value = params.data;
      this.setState({ value });
    } else {
      this.setState({ value: undefined });
    }
  };

  onCode = data => {
    this.setState({ value: marked('```javascript\n' + data.code + '\n```') }, () => {
      this.ref && highlight(this.ref)
    })
  }



  render() {
    if (!this.props.active) {
      return null;
    }

    if (this.state.value) {
      return <div ref={this.handleRef}
        className={'markdown-body'}
        dangerouslySetInnerHTML={{ __html: this.state.value }}
      />
    }
    return (
      <Placeholder>
        <React.Fragment>No STORY found</React.Fragment>
      </Placeholder>
    )
  }
}

addons.register(ADDON_ID, api => {
  const render = ({ active, key }) => <StoryPanel key={key} api={api} active={active} />;
  const title = 'Story';

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
  });
});