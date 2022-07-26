import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import * as enums from '../../../utils/enums';
import style from './styles';

const CometChatActionMessageBubble = (props) => {
  /**
   * Retrieve message text from message object according to message types
   * @param
   */
  const getMessage = useCallback(() => {
    const call = props.message;
    const { loggedInUser } = props;

    let message = null;
    switch (call.status) {
      case CometChat.CALL_STATUS.INITIATED: {
        message = 'Appel lancé';
        if (call.type === CometChat.CALL_TYPE.AUDIO) {
          if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
            message =
              call.callInitiator.uid === loggedInUser.uid
                ? 'Appel audio sortant'
                : 'Appel audio entrant';
          } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
            if (call.action === CometChat.CALL_STATUS.INITIATED) {
              message =
                call.callInitiator.uid === loggedInUser.uid
                  ? 'Appel audio sortant'
                  : 'Appel audio entrant';
            } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
              message =
                call.sender.uid === loggedInUser.uid
                  ? 'Appel rejeté'
                  : `${call.sender.name} appel rejeté`;
            }
          }
        } else if (call.type === CometChat.CALL_TYPE.VIDEO) {
          if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
            message =
              call.callInitiator.uid === loggedInUser.uid
                ? 'Appel vidéo sortant'
                : 'Appel vidéo entrant';
          } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
            if (call.action === CometChat.CALL_STATUS.INITIATED) {
              message =
                call.callInitiator.uid === loggedInUser.uid
                  ? 'Appel vidéo sortant'
                  : 'Appel vidéo entrant';
            } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
              message =
                call.sender.uid === loggedInUser.uid
                  ? 'Appel rejeté'
                  : `${call.sender.name} appel rejeté`;
            }
          }
        }
        break;
      }
      case CometChat.CALL_STATUS.ONGOING: {
        if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
          message = 'Appel accepté';
        } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
          if (call.action === CometChat.CALL_STATUS.ONGOING) {
            message =
              call.sender.uid === loggedInUser.uid
                ? 'Appel accepté'
                : `${call.sender.name} rejoint`;
          } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
            message =
              call.sender.uid === loggedInUser.uid
                ? 'Appel rejeté'
                : `${call.sender.name} appel rejeté`;
          } else if (call.action === 'gauche') {
            message =
              call.sender.uid === loggedInUser.uid
                ? "Vous avez quitté l'appel"
                : `${call.sender.name} a quitté l'appel`;
          }
        }

        break;
      }
      case CometChat.CALL_STATUS.UNANSWERED: {
        message = 'Appel sans réponse';
        if (
          call.type === CometChat.CALL_TYPE.AUDIO &&
          (call.receiverType === CometChat.RECEIVER_TYPE.USER ||
            call.receiverType === CometChat.RECEIVER_TYPE.GROUP)
        ) {
          message =
            call.callInitiator.uid === loggedInUser.uid
              ? 'Appel audio sans réponse'
              : 'Appel audio manqué';
        } else if (
          call.type === CometChat.CALL_TYPE.VIDEO &&
          (call.receiverType === CometChat.RECEIVER_TYPE.USER ||
            call.receiverType === CometChat.RECEIVER_TYPE.GROUP)
        ) {
          message =
            call.callInitiator.uid === loggedInUser.uid
              ? 'Appel vidéo sans réponse'
              : 'Appel vidéo manqué';
        }
        break;
      }
      case CometChat.CALL_STATUS.REJECTED: {
        message = 'Appel rejeté';
        break;
      }
      case CometChat.CALL_STATUS.ENDED:
        message = 'Appel terminé';
        break;
      case CometChat.CALL_STATUS.CANCELLED:
        message = 'Appel annulé';
        break;
      case CometChat.CALL_STATUS.BUSY:
        message = 'Appel occupé';
        break;
      default:
        break;
    }

    return <Text style={style.callMessageTxtStyle}>{message}</Text>;
  }, [props]);

  return <View style={style.callMessageStyle}>{getMessage()}</View>;
};

export default CometChatActionMessageBubble;
