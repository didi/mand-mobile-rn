import * as React from 'react'
import { MDField, MDInputItem } from '../../../src'

export default class NormalInputDemo extends React.Component {
    static navigationOptions = {
      title: '普通输入框',
    }

    render() {
      return (
        <MDField title="普通输入框">
          <MDInputItem
            value="我输入的内容"
            placeholder="普通文本"
            title="普通文本"
          />
          <MDInputItem value="禁用表单" title="禁用表单" disabled />
          <MDInputItem value="只读表单" title="只读表单" readonly />
          <MDInputItem placeholder="高亮表单" title="高亮表单" highlight />
          <MDInputItem placeholder="文本居中" title="文本居中" align="center" />
          <MDInputItem placeholder="文本居右" title="文本居右" align="right" />
        </MDField>
      )
    }
  }
