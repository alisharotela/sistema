import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const TicketIcon = ({ width, height, fill = "#000" }) => {
  return (
    <View>
      <Svg fill={fill} width={width} height={height} viewBox="0 0 24 24">
        <Path d="M6,23H18a3,3,0,0,0,3-3V4a3,3,0,0,0-3-3H15a1,1,0,0,0-1,1,2,2,0,0,1-4,0A1,1,0,0,0,9,1H6A3,3,0,0,0,3,4V20A3,3,0,0,0,6,23ZM5,10h.882a1,1,0,0,0,0-2H5V4A1,1,0,0,1,6,3H8.126a4,4,0,0,0,7.748,0H18a1,1,0,0,1,1,1V8h-.882a1,1,0,0,0,0,2H19V20a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1ZM7.706,9a1,1,0,0,1,1-1h1.882a1,1,0,1,1,0,2H8.706A1,1,0,0,1,7.706,9Zm4.706,0a1,1,0,0,1,1-1h1.882a1,1,0,0,1,0,2H13.412A1,1,0,0,1,12.412,9Z" />
      </Svg>
    </View>
  );
};
