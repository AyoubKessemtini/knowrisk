import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/Colors';
import { CImage } from '@components/CImage';
import ImageAssets from '@assets/images';

interface MainHeaderProps {
  firstName: string;
  lastName: string;
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
};

// const getBackgroundColor = (name: string) => {
//   // Simple hash function to generate a color based on the name
//   const hash = Array.from(name).reduce(
//     (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
//     0,
//   );
//   const color = `hsl(${hash % 360}, 70%, 80%)`;
//   return color;
// };

export const MainHeader = ({ firstName, lastName }: MainHeaderProps) => {
  const initials = getInitials(firstName, lastName);
  // const backgroundColor = getBackgroundColor(firstName + lastName);

  return (
    <View style={styles.container}>
      <CImage source={ImageAssets.LOGO_BANNER} width={151} height={26} />
      {initials ? (
        <View
          style={[styles.initialsContainer, { backgroundColor: Colors.cosmos }]}
        >
          <Text style={styles.initialsText}>{initials}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryWhite,
    ...Platform.select({
      ios: {
        paddingVertical: 20,
        paddingHorizontal: 20,
      },
      android: {
        paddingVertical: 20,
        paddingHorizontal: 20,
      },
    }),
  },
  initialsContainer: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: Colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
