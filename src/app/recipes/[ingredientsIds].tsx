import { styles } from "./styles";
import { FlatList, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "@/components/Recipe";
import { useEffect, useState } from "react";
import { services } from "@/services";
import { Ingredients } from "@/components/Ingredients";

export default function Recipes() {
    
    const params = useLocalSearchParams<{ ingredientsIds: string}>()

    // retorna uma string com os IDs entre virgulas, então criamos um array com os IDs
    const ingredientsIds = params.ingredientsIds.split(",");

    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
    const [recipes, setRecipes] = useState<RecipeResponse[]>([])

    useEffect(() => {
        services.ingredients.findByIds(ingredientsIds).then(setIngredients)
    }, [])

    useEffect(() => {
        services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons
                    name="arrow-back"
                    size={32}
                    onPress={() => router.back()}
                />

                <Text style={styles.title}>Ingredientes</Text>
            </View>

            <Ingredients ingredients={ingredients} />

            <FlatList
                    data={recipes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Recipe recipe={item}/>}
                    style={styles.recipes}
                    contentContainerStyle={styles.recipesContent}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ gap: 16 }}
                    numColumns={2}
                />
        </View>
    )
}