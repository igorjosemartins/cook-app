import { styles } from "./styles";
import { View, Text, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Ingredient } from "@/components/Ingredient";
import { Selected } from "@/components/Selected";
import { services } from "@/services"

export default function Index() {

    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

    function handleToggleSelected(value: string) {

        if (selectedIngredients.includes(value)) {
            // setar um novo array => pega o valor atual do selectedIngredient (state)
            // filter => retorna um novo array contendo os elementos que satisfazem uma condição:
            // no caso, se o item for diferente do atual selecionado, ele será mantido, senão removido

            // verifica se o ingrediente selecionado já está selecionado
            // se sim => é retirado 
            // se não => é mantido
            return setSelectedIngredients((state) => state.filter((item) => item !== value))
        }

        setSelectedIngredients((state) => [...state, value])
    }

    function handleClearSelected() {
        Alert.alert("Limpar", "Deseja limpar tudo?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => setSelectedIngredients([]) },
        ])
    }

    function handleSearch() {
        router.navigate("/recipes/" + selectedIngredients)
    }

    useEffect(() => {
        services.ingredients.findAll().then(setIngredients)
    }, [])

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
                {ingredients.map((item) => (
                    <Ingredient
                        key={item.id}
                        name={item.name}
                        image={`${services.storage.imagePath}/${item.image}`}
                        selected={selectedIngredients.includes(item.id)}
                        onPress={() => handleToggleSelected(item.id)}
                    />
                ))}
            </ScrollView>

            {selectedIngredients.length > 0 && (
                <Selected
                    quantity={selectedIngredients.length}
                    onClear={handleClearSelected}
                    onSearch={handleSearch}
                />)
            }
        </View>
    )
}