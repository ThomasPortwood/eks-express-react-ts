// https://marmelab.com/react-admin/DataProviders.html
// @ts-ignore
import {fetchUtils} from 'react-admin';
import {stringify} from "query-string";
// @ts-ignore
// import {stringify} from 'query-string';

const baseUrl = process.env.REACT_APP_HAL_ENDPOINT;

export default async (token: string) => {

  const myFetchJson = (url: string, options: any = {}) => {

    if (!options.headers) {
      options.headers = new Headers({});
    }

    options.headers.set('Authorization', `Bearer ${token}`);

    return fetchUtils.fetchJson(url, options);
  };

  return {

    getList: (resource: string, params: any = {}) => {

      console.log(`GET LIST ${resource}`);

      let url = `${baseUrl}/${resource}`;

      // TODO: query-string
      if (params.filter.name) url += `/search/findByNameContains?input=${params.filter.name ?? ""}`;
      if (resource === 'clubs') url += '?projection=clubMembers';

      return myFetchJson(url).then(({headers, json}: any) => {

        const total = json.page ? json.page.totalElements : json._embedded[resource].length;

        // https://marmelab.com/admin-on-rest/FAQ.html#can-i-have-custom-identifiers-primary-keys-for-my-resources
        // const data = json._embedded[resourceName].map((resource: any) => { return {...resource, id: resource._links.self.href}})

        return {data: json._embedded[resource], total}
      });
    },

    getOne: (resource: string, params: any = {}) => {
      console.log(`GET ONE ${resource}`);
      let url = `${baseUrl}/${resource}/${params.id}`;
      return myFetchJson(url).then(({headers, json}: any) => {
        return {data: json}
      })
    },

    getMany: (resource: string, params: any) => {

      console.log(`GET MANY ${resource}`);

      // TODO: implement id filter in the backend
      // const query = {
      //   filter: JSON.stringify({id: params.ids}),
      // };

      const url = `${baseUrl}/${resource}`;
      return myFetchJson(url).then(({json}: any) => ({data: json._embedded[resource]}));
    },

    getManyReference: (resource: string, params: any) => {
      console.log(`GET MANY REF ${resource}`);
      const { page, perPage } = params.pagination;
      // const { field, order } = params.sort;
      const query = {
        // sort: JSON.stringify([field, order]),
        page,
        size: perPage
      };
      const url = `${baseUrl}${params.target}?${stringify(query)}`;
      return myFetchJson(url).then(({json}: any) => ({data: json._embedded[resource]}));
    },

    create: (resource: string, params: any = {}) => {

      console.log(`CREATE ${resource}`);

      const url = `${baseUrl}/${resource}`;

      let body;

      if (resource === 'documents') {
        console.log(params);
        body = new FormData();
        body.append("file", params.data.picture.rawFile);
        body.append("propertyId", params.data.property.id);
        body.append("name", params.data.name);
        body.append("description", params.data.description);
      } else {
        body = JSON.stringify(params.data);
      }

      return myFetchJson(url, {method: "POST", body})
        .then(
          ({headers, json}: any) => ({data: json, id: json.id}),
          (error: any) => ({data: error}))
    },

    delete: (resource: string, params: any = {}) => {
      console.log(`DELETE ${resource}`);
      const url = `${baseUrl}/${resource}/${params.id}`;
      return myFetchJson(url, {method: "DELETE"}).then(() => {return {data: {}};})
    },

    deleteMany: (resource: string, params: any = {}) => {
      console.log(`DELETE MANY ${resource}`);
      return Promise.all(params.ids.map((id: bigint) => {
        const url = `${baseUrl}/${resource}/${id}`;
        return myFetchJson(url, {method: "DELETE"})
      })).then(() => {
        return {data: {}}
      });
    },

    update: (resource: string, params: any = {}) => {
      console.log(`UPDATE ${resource}`);
      const url = `${baseUrl}/${resource}/${params.id}`;
      return myFetchJson(url, {method: "PUT", body: JSON.stringify(params.data)})
        .then(({headers, json}: any) => {
          return {data: json, id: json.id};
        })
    },
  };
};
