# react-native-hud

A hud for react-native, easy to use.Required react-native version >= 0.42.0

### 1.Installation
`cd yourProjectPath`

`npm i react-native-easy-hud --save`

### 2.How to use
* Import
`import HudView from 'react-native-easy-hud';`

Add the Component to your root Component in method `render`, like this

```
1.initialization
_hud: HudView;
  render() {
    return (
      <View style={{flex: 1}}>
        //...other View Component
        <HudView
          ref={(hud) => {this._hud = hud}}
          delay={1.5}
        />
      </View>
    );
  }
 
 2.show
 this._hud.show();
 
 3.hide
 this._hud.hide();
 
 4.showMessage
 this._hud.showMessage('message');
```

### 3.Props

* hudType- Hud's type.Default is 'indicator'.
* message- Hud's message for type 'text'、'combine'.Default is 'Loading'.
* msgColor- Message's color. Default is 'white'.
* msgFontSize- Message's fontSize. Default is 15.
* msgAlign- Message's textAlign. Default is 'center'.
* delay- If set, hud will hide automatically after delay. Unit is second. Default is 0, that mean hud can't hide automatically.
* direction- Direction for hudType-[combine]. Default is 'row'.

