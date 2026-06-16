import {propertyRepository} from "../repositories/propertyRepository.js";
import type {PropertyInput} from "../types/property.js";

export const propertyService = {
    listProperties() {
        return propertyRepository.findAll();
    },

    getProperty(id:string) {
        return propertyRepository.findById(id);
    },

    createProperty(input: PropertyInput) {
        return propertyRepository.create(input);
    },

    updateProperty(id:string, input: PropertyInput) {
        return propertyRepository.update(id,input);
    },

    deleteProperty(id: string) {
        return propertyRepository.delete(id);
    }
}