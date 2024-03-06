import { Slot } from "expo-router"

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins"

// Slot => pega todas as rotas disponíveis na pasta app

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    })

    if (!fontsLoaded) {
        return
    }

    return fontsLoaded ? <Slot /> : null
}