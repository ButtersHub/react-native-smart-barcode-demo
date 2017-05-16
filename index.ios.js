/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
} from 'react-native';
import Barcode from 'react-native-smart-barcode'

export default class barcodetest extends Component {

    constructor (props) {
        super(props);
        this.state = {
            viewAppear: true,
        };
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center',}}>
                {this.state.viewAppear ? <Barcode style={{flex: 1, alignSelf: 'stretch', }}
                                                  ref={ component => this._barCode = component }
                                                  onBarCodeRead={this._onBarCodeRead}/> : null}

                {!this.state.viewAppear ? this._renderActivityIndicator() : null}
            </View>
        );
    }

    _onBarCodeRead = (e) => {
        console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan()
        Alert.alert(e.nativeEvent.data.type, e.nativeEvent.data.code, [
            { text: 'OK', onPress: () => this._startScan() },
        ])
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

    _renderActivityIndicator () {
        return ActivityIndicator ? (
                <ActivityIndicator
                    style={{position: 'relative', left: 1, top: 1,}}
                    animating={true}
                    size={'large'}/>
            ) : Platform.OS == 'android' ?
                (
                    <ProgressBarAndroid
                        styleAttr={'large'}/>

                ) : (
                    <ActivityIndicatorIOS
                        animating={true}
                        size={'large'}/>
                )
    }
}

AppRegistry.registerComponent('barcodetest', () => barcodetest);
