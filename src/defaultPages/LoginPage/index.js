import React from 'react';
import {connect} from 'react-redux';
import {CometChatAvatar} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index';
import {COMETCHAT_CONSTANTS} from '../../../src/CONSTS';
import style from './style';
import * as actions from '../../store/action';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import DropDownAlert from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Shared/DropDownAlert';
class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      showError: false,
    };
  }

  login = (uid, createUser = false) => {
    if (!uid) {
      uid = this.state.uid;
    }
    this.uid = uid;
    this.setState({showError: true});
    this.props.dispatch(
      actions.auth(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY, createUser),
    ); 
  };

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.navigation.navigate('HomePage');
    }
  }

  render() {
    let loader = null;

    if (this.props.loading) {
      loader = (
        <View style={style.loaderContainer}>
          <ActivityIndicator size="large" color="white"></ActivityIndicator>
        </View>
      );
    }

    let errorMessage = null;
    if (this.props.error && this.state.showError) {
      this.dropDownAlertRef?.showMessage('error', this.props.error.message);
    }

    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        {loader}

        <ScrollView>
          <View style={style.wrapperStyle}>
            {errorMessage}
            <Text style={style.titleStyle}>TchatApp</Text>
            <View style={style.uidWrapperStyle}>
              <View>
                <Text style={style.subtitleStyle}>Se connecter avec UID</Text>
              </View>
              <View style={style.inputWrapperStyle}>
                <TextInput
                  style={style.textInput}
                  onSubmitEditing={() => this.login('', true)}
                  onChangeText={(value) => {
                    this.setState({uid: value});
                  }}
                  placeholder="Entrez votre UID ici"
                />
              </View>
              <TouchableOpacity
                style={style.loginBtn}
                onPress={() => this.login('', true)}>
                <Text style={style.btnText}>Connexion</Text>
              </TouchableOpacity>
            </View>
          </View>
          <DropDownAlert
            onClose={() => this.setState({showError: false})}
            ref={(ref) => (this.dropDownAlertRef = ref)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({reducer}) => {
  return {
    loading: reducer.loading,
    error: reducer.error,
    isLoggedIn: reducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(LoginPage);
