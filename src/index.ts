import { DataProvider } from "ra-core";

/**
 * Export legacy dataProvider fetchType
 */
const GET_LIST = "GET_LIST";
const GET_ONE = "GET_ONE";
const GET_MANY = "GET_MANY";
const GET_MANY_REFERENCE = "GET_MANY_REFERENCE";
const CREATE = "CREATE";
const UPDATE = "UPDATE";
const UPDATE_MANY = "UPDATE_MANY";
const DELETE = "DELETE";
const DELETE_MANY = "DELETE_MANY";

export type Filter = (filter: any) => any;

export type Mixer = (
    resource: string
) =>
    | [DataProvider, string, Filter]
    | [DataProvider, string]
    | DataProvider
    | undefined;

const convertLegacyProvider = (provider: DataProvider | Function) => {
    if (typeof provider === "function") {
        return {
            getList: (resource, params) => provider(GET_LIST, resource, params),
            getOne: (resource, params) => provider(GET_ONE, resource, params),
            getMany: (resource, params) => provider(GET_MANY, resource, params),
            getManyReference: (resource, params) =>
                provider(GET_MANY_REFERENCE, resource, params),
            create: (resource, params) => provider(CREATE, resource, params),
            update: (resource, params) => provider(UPDATE, resource, params),
            updateMany: (resource, params) =>
                provider(UPDATE_MANY, resource, params),
            delete: (resource, params) => provider(DELETE, resource, params),
            deleteMany: (resource, params) =>
                provider(DELETE_MANY, resource, params),
        } as DataProvider;
    }

    return provider;
};

const mix = (mixer: Mixer, resource: string, params: any, hasFilter?: true) => {
    const mixed = mixer(resource);

    if (!mixed) {
        throw new Error(`Provider not found for resource: '${resource}'`);
    }

    if (Array.isArray(mixed) && mixed.length === 3) {
        if (hasFilter) {
            return [
                convertLegacyProvider(mixed[0]),
                mixed[1],
                {
                    ...params,
                    filter: mixed[2](params.filter),
                },
            ];
        } else {
            return [convertLegacyProvider(mixed[0]), mixed[1], params];
        }
    }

    if (Array.isArray(mixed) && mixed.length === 2) {
        return [convertLegacyProvider(mixed[0]), mixed[1], params];
    }

    return [convertLegacyProvider(mixed), resource, params];
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
