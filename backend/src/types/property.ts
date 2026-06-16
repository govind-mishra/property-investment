export type Property = {
    id:string;
    name:string;
    location:string;
    price:number;
    image:string;
    annualYield:number;
}

export type PropertyInput = Omit<Property, "id">;