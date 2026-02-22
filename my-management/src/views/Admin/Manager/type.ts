
export interface DataType {
    name: {
        first: string;
        last: string;
    };
    gender: string;
    email: string;
    login: {
        uuid: string;
    };
}



export type FieldType = {
    username?: string;
    phone?: string;
    type?: string;
};

export interface ChildRef {
    showModal: (type: number, item?: FieldType) => void;
}