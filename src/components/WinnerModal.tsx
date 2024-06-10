import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {Modal, Platform, Pressable, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import celebration from '../../assets/celebration.json';

type Props = {
  winner: number;
};

const styles = StyleSheet.create({
  lottieView: {
    flex: 1,
    marginBottom: Platform.OS === 'android' ? 45 : 0,
  },
  pressable: {
    flex: 1,
  },
});

const WinnerModal: FC<Props> = ({winner}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (winner) {
      setModalVisible(true);
    }
  }, [winner]);
  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => setModalVisible(false), 3000);
    }
  }, [modalVisible]);

  return (
    <Modal visible={modalVisible} transparent={true}>
      <Pressable
        onPress={() => setModalVisible(false)}
        style={styles.pressable}>
        <LottieView
          style={styles.lottieView}
          source={celebration}
          autoPlay
          loop
        />
      </Pressable>
    </Modal>
  );
};

export default WinnerModal;
