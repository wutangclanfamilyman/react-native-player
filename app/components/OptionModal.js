import {
  View,
  Text,
  Modal,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import color from "../misc/color";

const OptionModal = ({
  visible,
  onClose,
  currentSong,
  onAddPlaylistPress,
  onPlayPress,
}) => {
  const { filename } = currentSong;

  return (
    <>
      <StatusBar hidden={true} />
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <Text style={styles.option}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onAddPlaylistPress}>
              <Text style={styles.option}>Add to playlist</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback opPress={onClose} />
        <View style={styles.modalBg} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    borderTopLeftRadius: 20,
    borderTopStartRadius: 20,
    zIndex: 1000,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: color.MODAL_BG,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.FONT,
    paddingVertical: 10,
    letterSpacing: 1,
  },
});

export default OptionModal;
