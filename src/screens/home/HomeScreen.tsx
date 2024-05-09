import React from 'react';
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {CircleComponent, RowComponent, TextComponent} from '../../components';
import {HambergerMenu, Notification} from 'iconsax-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../../Constants/appColors.ts';
import {fontFamilies} from '../../Constants/fontFamilies.ts';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: 179,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
          paddingHorizontal: 16,
        }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <View style={[{flex: 1, alignItems: 'center'}]}>
            <RowComponent>
              <TextComponent
                text="Current Location"
                color={appColors.white2}
                size={12}
              />
              <MaterialIcons
                name="arrow-drop-down"
                size={18}
                color={appColors.white}
              />
            </RowComponent>
            <TextComponent
              text="New York, USA"
              flex={0}
              color={appColors.white}
              font={fontFamilies.medium}
              size={13}
            />
          </View>

          <CircleComponent color="#524CE0" size={36}>
            <View>
              <Notification size={18} color={appColors.white} />
              <View
                style={{
                  backgroundColor: '#02E9FE',
                  width: 10,
                  height: 10,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: '#524CE0',
                  position: 'absolute',
                  top: -2,
                  right: -2,
                }}
              />
            </View>
          </CircleComponent>
        </RowComponent>
      </View>
      <View
        style={[
          {
            flex: 1,
          },
        ]}
      />
    </View>
  );
};

export default HomeScreen;
