import React from 'react';
import {connect} from 'react-redux';

import styles from './styles';
import * as actions from '../../store/action';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CometChatUI from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/CometChatUI';

const HomePage = (props) => {
  if (!props.isLoggedIn) {
    props.navigation.navigate('LoginPage');
  }

  return (

          <View style={{flex: 1, margin: 0}}>
            <TouchableOpacity
              
              onPress={() => props.dispatch(actions.logout())}>
              <Text style={{textAlign: 'center',  padding: 10}} >Se déconnecter</Text>
            </TouchableOpacity>
            <CometChatUI />
          </View>

  );
};

const mapStateToProps = ({reducer}) => {
  return {
    loading: reducer.loading,
    error: reducer.error,
    isLoggedIn: reducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(HomePage);