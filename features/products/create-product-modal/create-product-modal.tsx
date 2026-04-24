import { ModalWindow } from "@/shared/ui/modal/modal-window"
import { CreateProductForm } from "../create-product-form/create-product-form"

type CreateProductModalProps = {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void
}

export const CreateProductModal = ({isVisible, setIsVisible}: CreateProductModalProps) => {
    return (
        <ModalWindow 
            visible={isVisible}
            onClose={() => setIsVisible(false)}
            content={() => <CreateProductForm setIsVisible={setIsVisible}/>}
        />
    )
}