import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {globalStyles} from '../styles/globalStyles.ts';
import {appColors} from '../Constants/appColors.ts';
import {TextComponent} from './';
import {fontFamilies} from '../Constants/fontFamilies.ts';

interface Props {
  onPress: () => void;
  label: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const TagComponent = (props: Props) => {
  const {onPress, label, icon, textColor, bgColor, styles} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.tag,
        {
          backgroundColor: bgColor ? bgColor : appColors.white,
        },
        styles,
      ]}>
      {icon && icon}
      <TextComponent
        text={label}
        font={fontFamilies.medium}
        styles={{marginLeft: icon ? 8 : 0}}
        color={
          textColor ? textColor : bgColor ? appColors.white : appColors.gray
        }
      />
    </TouchableOpacity>
  );
};

export default TagComponent;
