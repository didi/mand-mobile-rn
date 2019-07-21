import React from 'react';
import { withDocs } from 'storybook-readme';
import styled from 'styled-components';

// with custom preview element
export default withDocs({
  // it is easy with styled-components
  PreviewComponent: styled.div`
    text-align: center;
    padding: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  `,
  FooterComponent: ({ children }) => {
    return (
      <div
        style={{
          padding: '25px',
          // position: 'absolute',
          // bottom: 0,
          // width: '90%',
          // borderTop: '1px solid rgba(255, 0, 0, 0.1)',
          // background: 'rgba(255, 255, 0, 0.23)',
        }}
      >
        {children}
      </div>
    );
  },
});
