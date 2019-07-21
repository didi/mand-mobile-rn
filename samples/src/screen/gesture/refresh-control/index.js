import React from 'react'
import { StyleSheet, Text, ScrollView, View, FlatList } from 'react-native'
import { MDRefreshControl, MDField, MDCellItem, MDSwitch } from 'mand-mobile-rn'

export class RefreshControlScreen extends React.Component {
  static navigationOptions = {
    title: 'RefreshControl',
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      stateHidden: false,
      timeHidden: true,
      data: Array(10).fill(0),
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      const data = this.state.data
      data.push(0, 0, 0)
      this.setState({
        data: data,
        refreshing: false,
      })
    }, 2000)
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.item} key={index}>
        <Text>{index}</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <MDRefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            stateHidden={this.state.stateHidden}
            timeHidden={this.state.timeHidden}
          />
        }
      >
        <MDField title="配置">
          <MDCellItem
            title="隐藏状态"
            right={
              <MDSwitch
                checked={this.state.stateHidden}
                width={50}
                height={30}
                onChange={(checked) => {
                  this.setState({ stateHidden: checked })
                }}
              />
            }
          />
          <MDCellItem
            title="隐藏时间"
            right={
              <MDSwitch
                checked={this.state.timeHidden}
                width={50}
                height={30}
                onChange={(checked) => {
                  this.setState({ timeHidden: checked })
                }}
              />
            }
          />
        </MDField>

        <FlatList
          style={{ width: '100%' }}
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => {
            return index.toString()
          }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  switch: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})
