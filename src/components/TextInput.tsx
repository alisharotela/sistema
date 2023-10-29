import * as React from "react";
import { TextInput as TextInputPaper } from "react-native-paper";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
};

export const TextInput = ({
  label,
  value,
  onChangeText,
  keyboardType,
}: Props) => {
  return (
    <TextInputPaper
      label={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};
