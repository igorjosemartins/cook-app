import { View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { Ingredient } from "@/components/Ingredient";
import { Selected } from "@/components/Selected";

export default function Index() {

    const [selectedIngredient, setSelectedIngredient] = useState<string[]>([])

    function handleToggleSelected(value: string) {

        if (selectedIngredient.includes(value)) {
            // setar um novo array => pega o valor atual do selectedIngredient (state)
            // filter => retorna um novo array contendo os elementos que satisfazem uma condição:
            // no caso, se o item for diferente do atual selecionado, ele será mantido, senão removido

            // verifica se o ingrediente selecionado já está selecionado
            // se sim => é retirado 
            // se não => é mantido
            return setSelectedIngredient((state) => state.filter((item) => item !== value))
        }

        setSelectedIngredient((state) => [...state, value])
    }

    function handleClearSelected() {
        Alert.alert("Limpar", "Deseja limpar tudo?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => setSelectedIngredient([]) },
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Escolha {"\n"}
                <Text style={styles.subtitle}>os produtos</Text>
            </Text>

            <Text style={styles.message}>
                Descubra receitas baseadas nos produtos que você escolheu
            </Text>

            <ScrollView contentContainerStyle={styles.ingredients} showsVerticalScrollIndicator={false}>
                {Array.from({ length: 100 }).map((item, index) => (
                    <Ingredient
                        key={index}
                        name="Tomate"
                        image=""
                        selected={selectedIngredient.includes(String(index))}
                        onPress={() => handleToggleSelected(String(index))} />
                ))}
            </ScrollView>

            {selectedIngredient.length > 0 && (
                <Selected
                    quantity={selectedIngredient.length}
                    onClear={handleClearSelected}
                    onSearch={() => {}}
                />)
            }
        </View>
    )
}