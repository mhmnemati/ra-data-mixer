import { DataProvider } from "ra-core";

export default (
    mixer: (
        resource: string
    ) => [DataProvider, string] | DataProvider | undefined
): DataProvider => ({
    getList: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].getList(provider[1], params);
        }

        return provider.getList(resource, params);
    },
    getOne: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].getOne(provider[1], params);
        }

        return provider.getOne(resource, params);
    },
    getMany: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].getMany(provider[1], params);
        }

        return provider.getMany(resource, params);
    },
    getManyReference: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].getManyReference(provider[1], params);
        }

        return provider.getManyReference(resource, params);
    },
    create: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].create(provider[1], params);
        }

        return provider.create(resource, params);
    },
    update: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].update(provider[1], params);
        }

        return provider.update(resource, params);
    },
    updateMany: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].updateMany(provider[1], params);
        }

        return provider.updateMany(resource, params);
    },
    delete: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].delete(provider[1], params);
        }

        return provider.delete(resource, params);
    },
    deleteMany: async (resource, params) => {
        const provider = mixer(resource);

        if (!provider) {
            throw new Error(`Provider not found for resource: '${resource}'`);
        }

        if (Array.isArray(provider)) {
            return provider[0].deleteMany(provider[1], params);
        }

        return provider.deleteMany(resource, params);
    },
});
