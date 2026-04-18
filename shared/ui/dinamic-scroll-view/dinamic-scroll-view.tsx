import { Children, ReactNode, useState } from "react"
import { LayoutChangeEvent, ScrollView, View } from "react-native"


type DinamicScrollViewProps = {
    children: ReactNode
    maxHeight: number
}


export const DinamicScrollView = ({children, maxHeight}: DinamicScrollViewProps) => {
    const [contentHeight, setContentHeight] = useState(0)
    const [scrollEnabled, setScrollEnabled] = useState(false)


    const onContentLayout = (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height
        setContentHeight(height)
        setScrollEnabled(height > maxHeight)
    }

    return(
        <ScrollView scrollEnabled={scrollEnabled}
            style={{maxHeight: scrollEnabled ? maxHeight : contentHeight}}
        >
            <View onLayout={onContentLayout}>
                {children}
            </View>
        </ScrollView>
    )
}