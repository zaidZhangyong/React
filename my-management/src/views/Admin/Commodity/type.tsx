interface BrandLabelItem {
    id: number;
    label: string;
}

interface ProductTypeItem {
    id: number;
    type: string;
    createTime: string;
}

interface AddProps {
    isModalOpen: boolean;
    open: (visible: boolean) => void;
    typeIndex: boolean;
    labeldata: BrandLabelItem[]
    typeData: ProductTypeItem[]
    itemData: FieldType;
}

type FieldType = {
    url?: string;
    name?: string;
    type?: number;
    labels?: number[];
    num?: number
    unitPrice?: number
    selects?: SelectItem[]
    detail?: string
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