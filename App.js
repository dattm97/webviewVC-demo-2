/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import type {Node} from 'react';
import {
  Dimensions,
  // Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {registerGlobals} from 'react-native-webrtc';
const bypass = () => {
  registerGlobals();
  window.RTCPeerConnection.prototype.addTrack = () => {};
  window.RTCPeerConnection.prototype.getSenders = () => {};
  window.location = {protocol: 'https:'};
};

const App: () => Node = () => {
  bypass();
  const isDarkMode = useColorScheme() === 'dark';
  const [url, setUrl] = useState('');
  // const [eclinic, setEclinic] = useState('');
  // const [error, setError] = useState('');
  // const listEClinic = ['minhdat', 'nguyentt', 'trainghiem'];

  const refWebview = useRef(null);

  // const onChangeText = value => {
  //   setError('');
  //   setEclinic(value);
  // };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', marginTop: 16}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {url ? (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 16,
            }}>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: 'green',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setUrl('')}>
              <Text>Close</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  padding: 8,
                  backgroundColor: 'green',
                  marginHorizontal: 4,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => refWebview.current.goBack()}>
                <Text>Go back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 8,
                  backgroundColor: 'green',
                  marginHorizontal: 4,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => refWebview.current.reload()}>
                <Text>Reload</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <WebView
              ref={refWebview}
              source={{uri: url}}
              containerStyle={{
                marginTop: 4,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
              domStorageEnabled
              javaScriptEnabled
              sharedCookiesEnabled
              mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback
              originWhitelist={['*']}
              onError={syntheticEvent => {
                const {nativeEvent} = syntheticEvent;
                console.log('WebView error: ', nativeEvent);
              }}
              onHttpError={syntheticEvent => {
                const {nativeEvent} = syntheticEvent;
                console.log(
                  'WebView received error status code: ',
                  nativeEvent.statusCode,
                );
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: 'green',
              marginHorizontal: 4,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setUrl('https://0ec3-115-75-37-29.ap.ngrok.io/pk/dai-ichi-life');
            }}>
            <Text style={{color: 'white'}}>Mở</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
