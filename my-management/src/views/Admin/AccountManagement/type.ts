
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
    name?: string;
    age?: string;
    gender?: string;
    Email?: string;
};

export interface ChildRef {
    showModal: (type: number, item?: FieldType) => void;
}