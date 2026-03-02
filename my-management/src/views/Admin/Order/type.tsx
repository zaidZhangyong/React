
export interface DataType {
    username?: string;
    nick?: string;
    picturn?: string;
    phone?: string;
    address?: string;
    detailedAddress?: string;
    createTime?: string;
    status?: number
}





export interface ChildRef {
    showModal: (type: number, item?: FieldType) => void;
}
export type FieldType = {
    username?: string;
    phone?: string;
    type?: string;

};
