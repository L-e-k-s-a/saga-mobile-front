


export type Product =  {
        productName: string,
        isConfirm: boolean
    }

export type ProductAndOrder = {
    productId: string,
    familyId: string,
    nameList: string,
    productList: Product[]
}