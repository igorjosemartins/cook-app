import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { Ingredient } from "@/components/Ingredient";

export default function Index() {

    const [selectedIngredient, setSelectedIngredient] = useState<string[]>([])

    function handleToggleSelected(value: string) {
        
        if (selectedIngredient.includes(value)) {
            return setSelectedIngredient((state) => state.filter((item) => item !== value))
        }
        
        setSelectedIngredient((state) => [...state, value])
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
                    selected ={selectedIngredient.includes(String(index))}
                    onPress={() => handleToggleSelected(String(index))} />
                ))}
            </ScrollView>
        </View>
    )
}