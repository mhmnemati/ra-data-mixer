import { DataProvider } from "ra-core";

export default (
    mixer: (resource: string) => [DataProvider, string]
): DataProvider => ({
    getList: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.getList(targetResource || resource, params);
    },
    getOne: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.getOne(targetResource || resource, params);
    },
    getMany: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.getMany(targetResource || resource, params);
    },
    getManyReference: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.getManyReference(targetResource || resource, params);
    },
    create: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.create(targetResource || resource, params);
    },
    update: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.update(targetResource || resource, params);
    },
    updateMany: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.updateMany(targetResource || resource, params);
    },
    delete: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.delete(targetResource || resource, params);
    },
    deleteMany: async (resource, params) => {
        const [provider, targetResource] = mixer(resource);

        return provider.deleteMany(targetResource || resource, params);
    },
});
