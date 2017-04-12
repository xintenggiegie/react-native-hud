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
    /*
    * Hud's type.Default is 'indicator'.
    * */
    hudType: React.PropTypes.oneOf(['text', 'indicator', 'combine']),
    /*
    * Hud's message for type 'text'、'combine'.Default is 'Loading'.
    * */
    message: React.PropTypes.string,
    /*
    * Message's color. Default is 'white'.
    * */
    msgColor: ColorPropType,
    /*
    * Message's fontSize. Default is 15.
    * */
    msgFontSize: React.PropTypes.number,
    /*
    * Message's textAlign. Default is 'center'.
    * */
    msgAlign: React.PropTypes.string,
    /*
    * If set, hud will hide automatically after delay. Unit is second. Default is 0, that mean hud can't hide automatically.
    * */
    delay: React.PropTypes.number,
    /*
    * Direction for hudType-[combine]. Default is 'row'.
    * */
    direction: React.PropTypes.oneOf(['row', 'column'])
  };

  static defaultProps = {
    hudType: 'indicator',
    message: 'Loading...',
    msgColor: 'white',
    msgFontSize: 15,
    msgAlign: 'center',
    delay: 0,
    direction: 'row',
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
    // Return when component called componentWillUnmount or hud is not showing.
    if (this._calledComponentWillUnmount || !this.state.isShowing) {
      return;
    }
    this.setState({
      isShowing: false,
    });
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

  componentWillUnmount() {
    // Do nothing.
    // resolve Warning: setState(...): Can only update a mounted or mounting component.
    // This usually means you called setState() on an unmounted component.
  }

  _measureHeightAndWidth() {
    const DoubleMargin = 8 * 2;
    const msg = this.state.flag ? this.state.msg : this.props.message;
    const size = this.props.msgFontSize;

    let msgLessThanOneLine: boolean = msg.length * size / 220 < 1;
    if (msgLessThanOneLine) {
      let width: number = msg.length * size;
      return {width: width + DoubleMargin, height: size + DoubleMargin}
    } else {
      let height: number = msg.length * size / 220 * size;
      return {width: 220 + DoubleMargin, height: height + DoubleMargin};
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
              key="text"
        >{this.state.flag ? this.state.msg : this.props.message}
        </Text>
      );
      const combineW: number = this.props.direction === 'row' ? textStyle.width + 36 + 8 : textStyle.width;
      const combineH: number = this.props.direction === 'row' ? textStyle.height + 16 : textStyle.height + 36 + 8;
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
      } else if (this.props.hudType === 'combine') {
        content = (
          <View style={[styles.textHud, {width: combineW, height: combineH, flexDirection: this.props.direction}]}>
            {[(<ActivityIndicator size="large" key="indicator" />),
              text]}
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
    width: '100%',
    height: '100%',
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