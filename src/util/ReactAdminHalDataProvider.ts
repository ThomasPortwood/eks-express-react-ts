// https://marmelab.com/react-admin/DataProviders.html
// @ts-ignore
import {fetchUtils} from 'react-admin';
// @ts-ignore
// import {stringify} from 'query-string';

const baseUrl = process.env.REACT_APP_HAL_ENDPOINT;

export default async (token: string) => {

  const myFetchJson = (url: string, options: any = {}) => {
    if (!options.headers) {
      options.headers = new Headers({});
    }
    // options.headers.set('Content-Type', 'application/hal+json');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
  };

  return {

    getList: (resource: string, params: any = {}) => {

      console.log(`GET LIST ${resource}`);

      const resourceName = resource.toLowerCase();
      let url = `${baseUrl}/${resourceName}`;

      if (params.filter.name) url += `/search/findByNameContains?input=${params.filter.name ?? ""}`;

      return myFetchJson(url).then(({headers, json}: any) => {
        const total = json.page ? json.page.totalElements : json._embedded[resourceName].length;
        // https://marmelab.com/admin-on-rest/FAQ.html#can-i-have-custom-identifiers-primary-keys-for-my-resources
        const data = resourceName === 'groups'
          ? json._embedded[resourceName].map((resource: any) => { return {...resource, id: resource.name}})
          : json._embedded[resourceName];
        return {data, total}
      });
    },

    getOne: (resource: string, params: any = {}) => {

      console.log(`GET ONE ${resource}`);

      const resourceName = resource.toLowerCase();
      const url = `${baseUrl}/${resourceName}/${params.id}`;
      return myFetchJson(url).then(({headers, json}: any) => {
        return {data: json}
      })
    },

    getMany: (resource: string, params: any) => {

      console.log(`GET MANY ${resource}`);

      const resourceName = resource.toLowerCase();

      // TODO: implement id filter in the backend
      // const query = {
      //   filter: JSON.stringify({id: params.ids}),
      // };

      const url = `${baseUrl}/${resourceName}`;
      return myFetchJson(url).then(({json}: any) => ({data: json._embedded[resourceName]}));
    },

    getManyReference: (resource: string, params: any) => {

      console.log(`GET MANY REF ${resource}`);

      const resourceName = resource.toLowerCase();
      const url = `${baseUrl}/${params.target}`;
      return myFetchJson(url).then(({json}: any) => ({data: json._embedded[resourceName]}));
    },

    create: (resource: string, params: any = {}) => {

      console.log(`CREATE ${resource}`);

      const resourceName = resource.toLowerCase();
      const url = `${baseUrl}/${resourceName}`;

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
        .then(({headers, json}: any) => {
          return {data: json, id: json.id};
        })
    },

    delete: (resource: string, params: any = {}) => {
      const resourceName = resource.toLowerCase();
      const url = `${baseUrl}/${resourceName}/${params.id}`;
      return myFetchJson(url, {method: "DELETE",})
        .then(() => {
          return {data: {}};
        })
    },

    deleteMany: (resource: string, params: any = {}) => {
      const resourceName = resource.toLowerCase();
      return Promise.all(params.ids.map((id: bigint) => {
        const url = `${baseUrl}/${resourceName}/${id}`;
        return myFetchJson(url, {method: "DELETE"})
      })).then(() => {
        return {data: {}}
      });
    },

    update: (resource: string, params: any = {}) => {
      const resourceName = resource.toLowerCase();
      const url = `${baseUrl}/${resourceName}/${params.id}`;
      return myFetchJson(url, {method: "PUT", body: JSON.stringify(params.data)})
        .then(({headers, json}: any) => {
          return {data: json, id: json.id};
        })
    },
  };
};
