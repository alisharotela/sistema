import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../icons/fotohome.jpg')} style={styles.image}/>
      <Text style={styles.text}>Bienvenidos al sistema de seguimiento de pacientes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf9ff",
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    width:'100%',
    height: 400,
    objectFit:'contain'
  },
  text:{
    marginTop: 42,
    marginHorizontal: 16,
    fontSize:18,
    textAlign:'center'
  }
});
