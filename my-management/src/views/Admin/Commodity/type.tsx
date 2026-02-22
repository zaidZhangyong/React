interface BrandLabelItem {
    id: number;
    label: string;
}

interface ProductTypeItem {
    value: any;
    id: number;
    type: string;
    createTime: string;
    label?: string
}

interface AddProps {
    isModalOpen: boolean;
    open: (visible: boolean) => void;
    typeIndex: number;
    labeldata: BrandLabelItem[]
    typeList: ProductTypeItem[]
    itemData: FieldType;
}

type FieldType = {
    id?: number ;
    url?: string;
    name?: string;
    typeId?: number | null;
    labels?: number[];
    quantity?: number | string
    unitPrice?: number | string
    selects?: SelectItem[]
    detail?: string
    status?:number
};
interface SelectItem {
    id: string | number,
    name: string;
    values: any[];
}
interface ValueItem {
    id: number;
    text: string;
}