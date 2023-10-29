import { View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "./PersonaEditScreen";

export function FormButton(props: {
  goBack: () => void;
  handleSubmit: () => void;
  label: string;
}) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        mode="contained"
        onPress={() => props.goBack()}
        style={{
          width: "40%",
        }}
        buttonColor="orange"
      >
        Cancelar
      </Button>

      <Button
        mode="contained"
        onPress={() => props.handleSubmit()}
        style={{
          width: "40%",
        }}
      >
        {props.label}
      </Button>
    </View>
  );
}
