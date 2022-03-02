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
  // PermissionsAndroid,
  View,
  TextInput,
} from 'react-native';
import {WebView} from 'react-native-webview';
// import {
//   check,
//   checkMultiple,
//   PERMISSIONS,
//   request,
//   requestMultiple,
//   RESULTS,
// } from 'react-native-permissions';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [url, setUrl] = useState('');
  const [eclinic, setEclinic] = useState('');
  const [error, setError] = useState('');
  // const listEClinic = ['minhdat', 'nguyentt', 'trainghiem'];

  const refWebview = useRef(null);

  // var enteronce = false;

  // const handle = webView => {
  //   if (enteronce === false && webView.url.includes('/video-room')) {
  //     enteronce = true;
  //     // enteronce is to enter inside the code and ask permissions only once or else the page will continue to ask permission

  //     requestCameraAndGalleryPermission();
  //   } else {
  //     enteronce = false;
  //   }
  // };

  // const requestCameraAndGalleryPermission = async () => {
  //   // try {
  //   //   var permission =
  //   //     Platform.OS === 'ios'
  //   //       ? await check(PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE)
  //   //       : await PermissionsAndroid.check(
  //   //           PermissionsAndroid.PERMISSIONS.CAMERA,
  //   //         );

  //   //   console.log('======permission', permission);
  //   //   if (!permission) {
  //   //     const granted =
  //   //       Platform.OS === 'ios'
  //   //         ? await request(PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE)
  //   //         : await PermissionsAndroid.request(
  //   //             PermissionsAndroid.PERMISSIONS.CAMERA,
  //   //             {
  //   //               title: 'Cool Photo App Camera Permission',
  //   //               message:
  //   //                 'Cool Photo App needs access to your camera ' +
  //   //                 'so you can take awesome pictures.',
  //   //               buttonNeutral: 'Ask Me Later',
  //   //               buttonNegative: 'Cancel',
  //   //               buttonPositive: 'OK',
  //   //             },
  //   //           );
  //   //     if (
  //   //       granted === (RESULTS.GRANTED || PermissionsAndroid.RESULTS.GRANTED)
  //   //     ) {
  //   //       console.log('Camera && Microphone permissions granted');
  //   //     } else {
  //   //       console.log('Camera && Microphone permission denied');
  //   //     }
  //   //   }
  //   // } catch (err) {
  //   //   console.warn(err);
  //   // }
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const onChangeText = value => {
    setError('');
    setEclinic(value);
  };

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
              allowsInlineMediaPlayback={true}
              originWhitelist={['*']}
              javaScriptEnabled={true}
              mediaPlaybackRequiresUserAction={false}
              mediaCapturePermissionGrantType={'grantIfSameHostElsePrompt'}
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
          <TextInput
            style={{
              width: '80%',
              height: 40,
              margin: 12,
              borderWidth: 1,
              borderRadius: 16,
              padding: 10,
            }}
            placeholder="Nhập slug phòng khám"
            onChangeText={onChangeText}
            value={eclinic}
            autoCapitalize="none"
          />
          {error ? (
            <Text style={{marginBottom: 12, color: 'red'}}>{error}</Text>
          ) : null}
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
              console.log('eclinic', eclinic);
              if (!eclinic) {
                setError('Vui lòng nhập slug!');
              } else {
                setUrl(`https://e-doctor.dev/pk/${eclinic}`);
              }
            }}>
            <Text style={{color: 'white'}}>Đến phòng khám</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
