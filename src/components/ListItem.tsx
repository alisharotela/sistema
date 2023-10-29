import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
  text6?: string;
  IconSection: ReactElement;
};

export const ListItem = ({
  text1,
  text2,
  text3,
  text4,
  text5,
  text6,
  IconSection,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.col1}>
        <Text style={styles.text}>{text1}</Text>
        <Text style={styles.text}>{text2}</Text>
        <Text style={styles.text}>{text3}</Text>
      </View>
      <View style={styles.col2}>
        <Text style={styles.text}>{text4}</Text>
        <Text style={styles.text}>{text5}</Text>
        <Text style={styles.text}>{text6}</Text>
      </View>
      <View style={styles.col3}>{IconSection}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    gap: 8,
    marginBottom: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
  },
  col1: {
    flex: 3,

    display: "flex",
    justifyContent: "center",
    gap: 8,
  },
  col2: {
    flex: 2,

    display: "flex",
    justifyContent: "center",
    gap: 8,
  },
  col3: {
    width: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  text: {
    fontSize: 14,
    color: "black",
  },
});
