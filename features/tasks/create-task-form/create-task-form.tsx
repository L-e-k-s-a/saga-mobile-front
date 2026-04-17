import { VerLayout } from "@/shared/layouts/VerLayout/VerLayout"
import { styleForm } from "@/shared/styles/forms"
import { IndicatorImportant } from "@/shared/ui/indicator-important/indicator-important"
import { Input } from "@/shared/ui/Input/Input"
import { Typography } from "@/shared/ui/Typography/Typography"
import { useState } from "react"



type CreateTaskFormType = {
    title: string,
    description: string,
    indicator: string,
    executor: string[]
}

//добавить dropdowm с именами в семье чтобы можно было заполнять исполнителей
export const CreateTaskForm = () => {
    
    const [form, setForm] = useState<CreateTaskFormType>({
        title: '',
        description: '',
        indicator: '',
        executor: []
    })
    
    return (
        <VerLayout>
            <Input placeholder='Название задачи' value={form.title} style={styleForm.input}/> 
            <IndicatorImportant />
        </VerLayout>
    )
}