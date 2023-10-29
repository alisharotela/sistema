import { Picker } from "@react-native-picker/picker";

type Props = {
  label: string;
  value: string;
  onChange: (text: string) => void;
  items: { label: string; value: string }[];
};
export const SelectInput = ({ label, value, onChange, items }: Props) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
    >
      <Picker.Item label={label} value="" style={{ color: "gray" }} />
      {items.map(({ label, value }) => (
        <Picker.Item
          key={label}
          label={label}
          value={value}
          style={{ color: "black" }}
        />
      ))}
    </Picker>
  );
};
