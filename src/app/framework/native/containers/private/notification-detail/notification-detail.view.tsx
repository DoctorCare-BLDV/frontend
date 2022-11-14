import React, {useCallback, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
// import from library
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AutoHeightWebView from 'react-native-autoheight-webview';
// import from alias
import {FullScreenLoadingIndicator, Header, TextView} from '@native/components';
// localImport
import {useNotificationDetailModel} from './notification-detail.hook';
import {NotificationDetailProps} from './notification-detail.type';
import {styles} from './notification-detail.style';
import moment from 'moment';

const _NotificationDetail: React.FC<NotificationDetailProps> = props => {
  const {params} = props.route;
  const {} = useNotificationDetailModel();

  const [isWebViewLoading, setWebViewLoading] = useState(false);

  const handleLoadingWebView = useCallback(() => {
    setWebViewLoading(true);
  }, []);

  const handleLoadedWebView = useCallback(() => {
    setWebViewLoading(false);
  }, []);

  return (
    <View style={[styles.container]}>
      <Header leftOnpress={props.navigation.goBack} title={'Thông báo'} />

      <View>
        <ScrollView contentContainerStyle={styles.listContentContainer}>
          {!!params.img && (
            <View>
              <Image
                source={{
                  uri: params.img,
                }}
                resizeMode="contain"
                style={styles.headerImage}
              />
            </View>
          )}

          <View style={{marginTop: 16}}>
            {!!params.title && (
              <TextView style={styles.title}>{params.title}</TextView>
            )}
            {!!params.description && (
              <TextView style={styles.description}>
                {params.description}
              </TextView>
            )}
            {!!params.createAt && (
              <View style={styles.createAtContainer}>
                <AntDesignIcon
                  name="clockcircleo"
                  style={[styles.createAt, styles.createAtIcon]}
                />
                <TextView style={styles.createAt}>
                  {moment(params.createAt).format('DD-MM-YYYY HH:mm')}
                </TextView>
              </View>
            )}

            <AutoHeightWebView
              style={{
                paddingHorizontal: 32,
                width: '100%',
              }}
              scrollEnabled={false}
              onLoadStart={handleLoadingWebView}
              onLoad={handleLoadedWebView}
              source={{
                html: params.content || '',
              }}
              viewportContent={
                'width=device-width,  initial-scale=1.0, user-scalable=no'
              }
            />
          </View>
        </ScrollView>
      </View>

      <FullScreenLoadingIndicator
        visible={isWebViewLoading}
        useModal={false}
        containerStyle={{}}
      />
    </View>
  );
};

export const NotificationDetail = React.memo(_NotificationDetail);
