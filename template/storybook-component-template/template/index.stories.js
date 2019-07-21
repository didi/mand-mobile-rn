import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select, color, object } from '@storybook/addon-knobs';
import { MD{{ccname}} } from 'mand-mobile-rn';
import { withReadme } from 'storybook-readme';
import Readme from './README.md';
import widthCustomPreview from '../../custom'
import GeneralMD from '../../GENERAL.md'

storiesOf('{{category}}/{{ccname}}', module)
  .addDecorator(withReadme(Readme))
  .add('With knobs', widthCustomPreview(GeneralMD, () => {
    return (
      <MD{{ccname}}></MD{{ccname}}>
    );
  }))
