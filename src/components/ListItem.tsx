import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  idFicha?: string;
  label1?: string;
  text1?: string;
  label2?: string;
  text2?: string;
  label3?: string;
  text3?: string;
  label4?: string;
  text4?: string;
  label5?: string;
  text5?: string;
  label6?: string;
  text6?: string;
  IconSection: ReactElement;
};

export const ListItem = ({
  idFicha,
  label1,
  text1,
  label2,
  text2,
  label3,
  text3,
  label4,
  text4,
  label5,
  text5,
  label6,
  text6,
  IconSection,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {idFicha && <Text style={styles.idFicha}>{`${idFicha}`}</Text>}
        <View style={styles.row}>
          <Text style={styles.label}>{label1}</Text>
          <Text style={styles.text}>{text1}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{label2}</Text>
          <Text style={styles.text}>{text2}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{label3}</Text>
          <Text style={styles.text}>{text3}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{label4}</Text>
          <Text style={styles.text}>{text4}</Text>
        </View>{
          text5 &&
          <View style={styles.row}>
            <Text style={styles.label}>{label5}</Text>
            <Text style={styles.text}>{text5}</Text>
          </View>}{
          text6 &&
          <View style={styles.row}>
            <Text style={styles.label}>{label6}</Text>
            <Text style={styles.text}>{text6}</Text>
          </View>}
      </View>
      <View style={styles.icons}>
        {IconSection}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: "black",
  },
  idFicha: {
    fontWeight: "bold",
    fontSize: 16,
    color: "blue",
    marginBottom: 8,
  },
  icons: {
    marginLeft: 16,
    justifyContent: 'center',
  },
});
