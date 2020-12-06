import { DataProvider, fetchUtils } from "ra-core";
import { stringify } from "query-string";

/**
 * 1. Remove null values
 * 2. Convert Date toISOString
 * 3. Remove same with previous values
 *
 * {
 *  a:1,
 *  b:2,
 *  c:null,
 *  d: {
 *      x: 1,
 *      y: 2,
 *      z: undefined
 *  }
 * }
 */
const clear = (data: object, previous?: any): any => {
    return Object.fromEntries(
        Object.entries(data)
            .filter(([_, value]) => value !== null && value !== undefined)
            .map(([key, value]) => {
                if (typeof value !== "object") {
                    return [key, value];
                }

                if (Object.prototype.toString.call(value) === "[object Date]") {
                    return [key, value.toISOString()];
                }

                if (Array.isArray(value)) {
                    return [
                        key,
                        value.map((item, index) =>
                            clear(item, ((previous || {})[key] || {})[index])
                        ),
                    ];
                } else {
                    return [key, clear(value, (previous || {})[key])];
                }
            })
            .filter(
                ([_, value]) =>
                    !(
                        typeof value === "object" &&
                        Object.entries(value).length <= 0
                    )
            )
    );
};

export default (
    apiUrl: string,
    aggregate = (resource: string) => [] as object[],
    httpClient = fetchUtils.fetchJson
): DataProvider => ({
    getList: async (resource, params) => {
        const filter = stringify({
            filter: JSON.stringify({
                where: params.filter,
                offset:
                    (params.pagination.page - 1) * params.pagination.perPage,
                limit: params.pagination.perPage,
                order: [`${params.sort.field} ${params.sort.order}`],
                include: aggregate(resource),
            }),
        });

        const result = await httpClient(`${apiUrl}/${resource}?${filter}`, {
            method: "GET",
            headers: new Headers({
                "X-Total": "true",
            }),
        });

        return {
            data: result.json,
            total: parseInt(result.headers.get("x-total-count") || "0"),
        };
    },
    getOne: async (resource, params) => {
        const filter = stringify({
            filter: JSON.stringify({
                include: aggregate(resource),
            }),
        });

        const result = await httpClient(
            `${apiUrl}/${resource}/${params.id}?${filter}`,
            {
                method: "GET",
                headers: new Headers({}),
            }
        );

        return {
            data: result.json,
        };
    },
    getMany: async (resource, params) => {
        const filter = stringify({
            filter: JSON.stringify({
                where: {
                    id: { inq: params.ids },
                },
                include: aggregate(resource),
            }),
        });

        const result = await httpClient(`${apiUrl}/${resource}?${filter}`, {
            method: "GET",
            headers: new Headers({}),
        });

        return {
            data: result.json,
        };
    },
    getManyReference: async (resource, params) => {
        const filter = stringify({
            filter: JSON.stringify({
                where: { ...params.filter, [params.target]: params.id },
                offset:
                    (params.pagination.page - 1) * params.pagination.perPage,
                limit: params.pagination.perPage,
                order: [`${params.sort.field} ${params.sort.order}`],
                include: aggregate(resource),
            }),
        });

        const result = await httpClient(`${apiUrl}/${resource}?${filter}`, {
            method: "GET",
            headers: new Headers({
                "X-Total": "true",
            }),
        });

        return {
            data: result.json,
            total: parseInt(result.headers.get("x-total-count") || "0"),
        };
    },
    create: async (resource, params) => {
        const result = await httpClient(`${apiUrl}/${resource}/one`, {
            method: "POST",
            body: JSON.stringify(clear(params.data)),
            headers: new Headers({}),
        });

        return {
            data: result.json,
        };
    },
    update: async (resource, params) => {
        await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(clear(params.data, params.previousData)),
            headers: new Headers({}),
        });

        return {
            data: params.previousData as any,
        };
    },
    updateMany: async (resource, params) => {
        const filter = stringify({
            filter: JSON.stringify({
                where: {
                    id: { inq: params.ids },
                },
            }),
        });

        await httpClient(`${apiUrl}/${resource}?${filter}`, {
            method: "PUT",
            body: JSON.stringify(clear(params.data)),
            headers: new Headers({}),
        });

        return {
            data: params.ids,
        };
    },
    delete: async (resource, params) => {
        await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
            headers: new Headers({}),
        });

        return {
            data: params.previousData as any,
        };
    },
    deleteMany: async (resource, params) => {
        const filter = stringify({
            filter: JSON.stringify({
                where: {
                    id: { inq: params.ids },
                },
            }),
        });

        await httpClient(`${apiUrl}/${resource}?${filter}`, {
            method: "DELETE",
            headers: new Headers({}),
        });

        return {
            data: params.ids,
        };
    },
});
