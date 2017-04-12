/**
 * Created by mac on 17/3/24.
 * @flow
 */

'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import HudView from '../common/HudView';

export default class HudExample extends Component {
  state: {
    type: ?number,
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      type: null,
    };
  }

  _hud: HudView;
  render() {
    let hudContent;
    switch (this.state.type) {
      case 0:
        hudContent = (
          <HudView
            ref={(hud) => {this._hud = hud}}
            hudType="indicator"
            delay={1.5}
          />
        );
        break;
      case 1:
        hudContent = (
          <HudView
            ref={(hud) => {this._hud = hud}}
            hudType="text"
            delay={2}
          />
        );
        break;
      case 2:
        hudContent = (
          <HudView
            ref={(hud) => {this._hud = hud}}
            hudType="combine"
            delay={2}
            direction="row"
          />
        );
        break;
      case 3:
        hudContent = (
          <HudView
            ref={(hud) => {this._hud = hud}}
            hudType="combine"
            delay={2}
            direction="column"
          />
        );
        break;
      case 4:
        hudContent = (
          <HudView
            ref={(hud) => {this._hud = hud}}
            hudType="text"
            delay={2}
            message="This is a text hud.If you find some problems please issue me.URL:https://github.com/liyonghui16/react-native-hud/issues."
          />
        );
        break;
      default:
        hudContent = (
          <HudView
            ref={(hud) => {this._hud = hud}}
            delay={2}
          />
        );
    }
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
        <Text style={styles.text} onPress={() => {
          this.setState({type: 0});
          this._hud.show();
        }}>Default hud</Text>
        <Text style={styles.text} onPress={() => {
          this.setState({type: 1});
          this._hud.show();
        }}>Text hud</Text>
        <Text style={styles.text} onPress={() => {
          this.setState({type: 2});
          this._hud.show();
        }}>Combine hud-row</Text>
        <Text style={styles.text} onPress={() => {
          this.setState({type: 3});
          this._hud.show();
        }}>Combine hud-column</Text>
        <Text style={styles.text} onPress={() => {
          this.setState({type: 4});
          this._hud.show();
        }}>Many message</Text>
        {hudContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    width: 375,
    height: 44,
    textAlign: 'center',
    backgroundColor: 'gray',
  }
});