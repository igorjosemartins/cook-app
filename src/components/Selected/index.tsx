import Animated, { SlideInDown, BounceOutDown } from "react-native-reanimated"
import { View, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { styles } from "./styles"
import { theme } from "@/theme"

type Props = {
    quantity: number
    onClear: () => void
    onSearch: () => void
}

export function Selected({ quantity, onClear, onSearch }: Props) {
    return (
        // View animada
            // propriedade para animação de entrada => 'entering'
            // propriedade para animação de saída => 'exiting'
        <Animated.View style={styles.container} entering={SlideInDown.duration(500)} exiting={BounceOutDown}>
            <View style={styles.header}>
                <Text style={styles.label}>{quantity} ingredientes selecionados</Text>
                <MaterialIcons
                    name="close"
                    size={24}
                    onPress={onClear}
                    color={theme.colors.gray_400} />
            </View>
        </Animated.View>
    )
}