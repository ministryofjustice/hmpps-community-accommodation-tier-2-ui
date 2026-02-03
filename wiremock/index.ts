import superagent, { Response, SuperAgentRequest } from 'superagent'

const wiremockEndpoint = process.env.CYPRESS ? 'http://localhost:9999' : 'http://localhost:9092'

const url = `${wiremockEndpoint}/__admin`

const getMatchingRequests = (body: object) => superagent.post(`${url}/requests/find`).send(body)

const resetStubs = (): Promise<Array<Response>> =>
  Promise.all([superagent.delete(`${url}/mappings`), superagent.delete(`${url}/requests`)])

const stubFor = (mapping: Record<string, unknown>): SuperAgentRequest =>
  superagent.post(`${url}/mappings`).send(mapping)

export { getMatchingRequests, resetStubs, stubFor }
