import { DataProvider } from "ra-core";

export type Filter = (filter: any) => any;

export type Mixer = (
    resource: string
) =>
    | [DataProvider, string, Filter]
    | [DataProvider, string]
    | DataProvider
    | undefined;

const mix = (mixer: Mixer, resource: string, params: any, hasFilter?: true) => {
    const mixed = mixer(resource);

    if (!mixed) {
        throw new Error(`Provider not found for resource: '${resource}'`);
    }

    if (Array.isArray(mixed) && mixed.length === 3) {
        if (hasFilter) {
            return [
                mixed[0],
                mixed[1],
                {
                    ...params,
                    filter: mixed[2](params.filter),
                },
            ];
        } else {
            return [mixed[0], mixed[1], params];
        }
    }

    if (Array.isArray(mixed) && mixed.length === 2) {
        return [mixed[0], mixed[1], params];
    }

    return [mixed, resource, params];
};

export default (mixer: Mixer): DataProvider => ({
    getList: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params,
            true
        );

        return mixedProvider.getList(mixedResource, mixedParams);
    },
    getOne: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params
        );

        return mixedProvider.getOne(mixedResource, mixedParams);
    },
    getMany: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params
        );

        return mixedProvider.getMany(mixedResource, mixedParams);
    },
    getManyReference: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params,
            true
        );

        return mixedProvider.getManyReference(mixedResource, mixedParams);
    },
    create: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params
        );

        return mixedProvider.create(mixedResource, mixedParams);
    },
    update: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params
        );

        return mixedProvider.update(mixedResource, mixedParams);
    },
    updateMany: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params
        );

        return mixedProvider.updateMany(mixedResource, mixedParams);
    },
    delete: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params
        );

        return mixedProvider.delete(mixedResource, mixedParams);
    },
    deleteMany: async (resource, params) => {
        const [mixedProvider, mixedResource, mixedParams] = mix(
            mixer,
            resource,
            params
        );

        return mixedProvider.deleteMany(mixedResource, mixedParams);
    },
});
