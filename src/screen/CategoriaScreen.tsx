import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
  View,
} from "react-native";
import { AnimatedFAB, IconButton } from "react-native-paper";
import PacienteService from "../services/PacienteService";
import { ListItem } from "../components/ListItem";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CategoriaService from "../services/CategoriaService";

const CategoriaScreen = ({ visible, animateFrom, style }) => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  const [isExtended, setIsExtended] = React.useState(true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  const {
    data: categorias,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: () => CategoriaService.getCategorias(),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={onScroll}
        refreshControl={
          <RefreshControl onRefresh={() => refetch()} refreshing={isLoading} />
        }
        contentContainerStyle={{
          marginVertical: 16,
          marginBottom: 100,
        }}
      >
        {categorias?.lista?.map((categoria) => (
          <ListItem
            key={categoria.idCategoria}
            text1={categoria.idCategoria.toString()}
            text2={categoria.descripcion}
            IconSection={
              <>
                <IconButton
                  onPress={() =>
                    createTwoButtonAlert({
                      onConfirm: async () => {
                        await CategoriaService.delCategoria(
                          categoria.idCategoria
                        );
                        queryClient.invalidateQueries({
                          queryKey: ["categorias"],
                        });
                      },
                    })
                  }
                  icon={() => <DeleteIcon width={24} height={24} fill="red" />}
                />
                <IconButton
                  onPress={() =>
                    navigation.navigate("Editar categoria", {
                      idCategoria: categoria.idCategoria,
                    })
                  }
                  icon={() => <EditIcon width={24} height={24} fill="black" />}
                />
              </>
            }
          />
        ))}
        <View style={{ height: 96 }}></View>
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"Nueva categoria"}
        extended={isExtended}
        onPress={() => navigation.navigate("Nueva categoria")}
        visible={visible}
        animateFrom={"right"}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </SafeAreaView>
  );
};

export default CategoriaScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});

const createTwoButtonAlert = ({ onConfirm }) =>
  Alert.alert(
    "Desea eliminar?",
    "Si aceptas eliminar ya no se podra recuperar",
    [
      {
        text: "Cancelar",
        // onPress: () => onCancel,
        style: "cancel",
      },
      { text: "Eliminar", onPress: onConfirm },
    ]
  );
