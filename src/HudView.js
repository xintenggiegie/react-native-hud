/**
 * Created by livan on 17/3/13.
 * @flow
 */

'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Text,
  ColorPropType,
} from 'react-native';

export default class HudView extends Component {
  state = {
    isShowing: false,
    flag: false,
    msg: '',
  };

  static propTypes = {
    hudType: React.PropTypes.oneOf(['text', 'indicator', 'combine']),
    message: React.PropTypes.string,
    msgColor: ColorPropType,
    msgFontSize: React.PropTypes.number,
    msgAlign: React.PropTypes.string,
    delay: React.PropTypes.number,
  };

  static defaultProps = {
    hudType: 'indicator',
    message: 'Loading...',
    msgColor: 'white',
    msgFontSize: 14,
    msgAlign: 'center',
    delay: 0,
  };

  /*
  * Show hudView.
  * */
  show() {
    this.setState({
      isShowing: true,
    });
    if (this.props.delay) {
      setTimeout(() => {
        this.hide();
      }, this.props.delay * 1000);
    }
  }

  /*
  * Hid hudView
  * */
  hide() {
    if (this._calledComponentWillUnmount) {
      return;
    }
    this.setState({
      isShowing: false,
    });
  }

  componentWillUnmount() {
    // Do nothing.
    // resolve Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component.
  }

  /*
   * This method's params-message will cover props-message.
   * */
  showMessage(message: string) {
    this.setState({
      flag: true,
      msg: message,
    });
    this.show();
  }

  _measureHeightAndWidth() {
    const msg = this.state.flag ? this.state.msg : this.props.message;
    const size = this.props.msgFontSize;

    let msgLessThanOneLine: boolean = msg.length * size / 220 < 1;
    if (msgLessThanOneLine) {
      let width: number = msg.length * size;
      return {width: width + 20, height: size + 10 * 2}
    } else {
      let height: number = msg.length * size / 220 * size;
      return {width: 220 + 10 * 2, height: height + 10 * 2};
    }
  }

  render() {
    if (this.state.isShowing) {
      let content;
      let textStyle = this._measureHeightAndWidth();
      let text = (
        <Text style={{
                fontSize: this.props.msgFontSize,
                color: this.props.msgColor,
                textAlign: this.props.msgAlign,
              }}
        >{this.state.flag ? this.state.msg : this.props.message}
        </Text>
      );
      if (this.props.hudType === 'indicator') {
        content = (
          <View style={styles.defaultHud}>
            <ActivityIndicator size="large"/>
          </View>
        );
      } else if (this.props.hudType === 'text') {
        content = (
          <View style={[styles.textHud, {width: textStyle.width, height: textStyle.height}]}>
            {text}
          </View>
        );
      } else if (this.props.hudType === 'textIndicator') {
        content = (
          <View style={[styles.textHud, {width: textStyle.width, height: textStyle.height + 36 + 8}]}>
            <ActivityIndicator size="large"/>
            {text}
          </View>
        );
      } else {
        //console.warn('HudView: The Value of hudType must be one of [text, indicator, textIndicator]');
      }

      return (
        <View style={styles.container}>
          {content}
        </View>
      );
    } else {
     return (null);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 64 - 49,
  },
  defaultHud: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555555',
    borderRadius: 4,
  },
  textHud: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555555',
    borderRadius: 4,
  },
});