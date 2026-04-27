import { COLORS } from "@/shared/constants/colors"
import { Switch } from "react-native"


type ToggleProps = {
    isEnabled: boolean,
    onValueChange: () => void  
}

export const Toggle = ({isEnabled, onValueChange}: ToggleProps) => {
    return (
        <Switch
            trackColor={{ false: "#767577", true: COLORS.green }}
            thumbColor={isEnabled ? COLORS.secondary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            onValueChange={onValueChange} 
        />
    )
}