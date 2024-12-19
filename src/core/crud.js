//====================================================================================================
// @ CRUD
//----------------------------------------------------------------------------------------------------
// 		RESTful API Create-Read-Update-Delete operations.
//====================================================================================================

//----------------------------------------------------------------------------------------------------
// # Client
//----------------------------------------------------------------------------------------------------
import axios from "axios";
const client = axios.create({
  baseURL: "data",
  withCredentials: false,
  headers: {
    Accept: "text/yaml",
    "Content-Type": "text/yaml",
  },
});

//----------------------------------------------------------------------------------------------------
// # Operations
//----------------------------------------------------------------------------------------------------
import jsyaml from "js-yaml";
// export const createYaml = async (path, data) =>
//   jsyaml.load((await client.post(`${path}.yml`, data)).data);
export const readYaml = async (path) =>
  jsyaml.load((await client.get(`${path}.yml`)).data);
// export const updateYaml = async (path, data) =>
//   jsyaml.load(await client.put(`${path}.yml`, data).data);
// export const deleteYaml = async (path) =>
//   jsyaml.load(await client.delete(`${path}.yml`).data);
