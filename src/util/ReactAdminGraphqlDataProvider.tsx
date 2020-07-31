// https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple#overriding-a-specific-query
// @ts-ignore
import buildGraphQLProvider from 'ra-data-graphql-simple';

export const createReactAdminGraphqlDataProvider = async (apolloClient: any, token: string) => {

  // const myBuildQuery = (introspection: any) => (fetchType: string, resource: string, params: any) => {

  //   const builtQuery = buildQuery(introspection)(fetchType, resource, params);
  //
  //   if (resource === 'Document' && fetchType === 'CREATE') {
  //
  //     const formData = new FormData();
  //
  //     formData.append("file", params.data.picture.rawFile);
  //
  //     fetch('http://localhost:8080/rest/documents', {
  //       method: "POST",
  //       body: formData,
  //       headers: {'Authorization': `Bearer ${token}`}
  //     })
  //       .then((response) => response.json())
  //       .then((json) => console.log(json));
  //
  //     return {
  //       ...builtQuery,
  //     };
  //   }
  //
  //   return builtQuery;
  // };

  // return await buildGraphQLProvider({client: apolloClient, buildQuery: myBuildQuery});

  return await buildGraphQLProvider({client: apolloClient});

};


