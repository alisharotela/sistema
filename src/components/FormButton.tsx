import { View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../screen/PersonaEditScreen";

export function FormButton(props: {
  goBack: () => void;
  handleSubmit: () => void;
  label: string;
  cancelLabel?: string;
  isLoading?: boolean
}) {
  const cancelLabel = props.cancelLabel ?? "Cancelar";
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
        {cancelLabel}
      </Button>

      <Button
        mode="contained"
        onPress={() => props.handleSubmit()}
        style={{
          width: "40%",
        }}
        loading={props.isLoading??false}
        
      >
        {props.label}
      </Button>
    </View>
  );
}
