import React from 'react';
import {CardComponent, TextComponent} from '.';
import {appInfos} from '../Constants/appInfos.ts';

interface Props {
  item: any;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;

  return (
    <CardComponent
      styles={{width: appInfos.sizes.WIDTH * 0.6}}
      onPress={() => {}}>
      <TextComponent
        numOfLine={1}
        text="International Band Music Concert"
        title
        size={18}
      />
    </CardComponent>
  );
};

export default EventItem;
