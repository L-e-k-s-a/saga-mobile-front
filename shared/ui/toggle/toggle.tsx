import { COLORS } from "@/shared/constants/colors"
import { Switch } from "react-native"


type ToggleProps = {
    isEnabled: boolean,
    setIsEnabled: (isEnabled: boolean) => void
}

export const Toggle = ({isEnabled, setIsEnabled}: ToggleProps) => {
    return (
        <Switch
            trackColor={{ false: "#767577", true: COLORS.green }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            onValueChange={() => setIsEnabled(!isEnabled)}
            disabled={false}
        />
    )
}