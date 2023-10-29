import { View } from "react-native";
import { Text } from "react-native-paper";
import DatePickerBase from "@dietime/react-native-date-picker";

export const DatePicker = ({ value, onChange, label }) => {
  return (
    <View>
      <Text style={{ fontSize: 16, color: "gray", marginStart: 12 }}>
        {label}
        {": "}
        {value ? new Date(value).toLocaleDateString() : "Seleccione una fecha"}
      </Text>
      <DatePickerBase
        startYear={2023}
        endYear={2030}
        value={value}
        onChange={onChange}
        format="dd-mm-yyyy"
        fontSize={16}
        height={128}
        fadeColor="#f0f0f0"
      />
    </View>
  );
};
