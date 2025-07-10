// @ts-expect-error types for @pactflow/openapi-pact-comparator aren't automatically resolved
import { Comparator } from '@pactflow/openapi-pact-comparator'
import path from 'path'
import { diffStringsUnified } from 'jest-diff'
import fs from 'fs'

export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchStringIgnoringWhitespace(expected: string): R

      toMatchOpenAPISpec(): Promise<R>
    }
  }
}

const apiSpecPath = path.join(__dirname, '..', '..', 'tmp', 'cas2-api.json')
const apiSpecUrl = 'https://approved-premises-api-dev.hmpps.service.justice.gov.uk/v3/api-docs/CAS2Shared'

/**
 * Returns a local file if it exists, or downloads it and saves it then returns it if it doesn't.
 * @param filePath  The path to the file
 * @param url       The Url to download the file from. If this is not specified, and the file is not found, an error is thrown.
 * @returns         Contents of the file as a Buffer
 */
async function getFileContents(filePath: string, url?: string): Promise<Buffer> {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath)
  }

  if (!url) throw new Error(`File does not exist: ${filePath}`)

  const response = await fetch(url)
  if (!response.ok) throw new Error(`Error fetching file from ${url}: HTTP ${response.status}`)

  const buffer = new Uint8Array(await response.arrayBuffer())
  fs.writeFileSync(filePath, buffer)
  return Buffer.from(buffer)
}

expect.extend({
  toMatchStringIgnoringWhitespace(received, expected) {
    const pass = received.replace(/\s+/g, ``) === expected.replace(/\s+/g, ``)

    return {
      pass,
      message: pass
        ? () => `expected received not to match expected ${diffStringsUnified(expected, received)}`
        : () => `expected received to match expected ${diffStringsUnified(expected, received)}`,
    }
  },
  async toMatchOpenAPISpec(pactPath) {
    try {
      const openApiSpec = JSON.parse((await getFileContents(apiSpecPath, apiSpecUrl)).toString())
      const pact = JSON.parse((await getFileContents(pactPath)).toString())

      const comparator = new Comparator(openApiSpec)
      const results = []

      try {
        // eslint-disable-next-line no-restricted-syntax
        for await (const result of comparator.compare(pact)) {
          results.push(result)
        }
      } catch (error) {
        // log compare errors for reference
        // eslint-disable-next-line no-console
        console.warn(error.message)
      }

      if (results.length) {
        // Map errors for a more readable log
        const errorsLog = results.map(result => JSON.stringify(result, null, 2)).join('\n-------------\n')

        return {
          message: () => `OpenAPI Validation errors for ${pactPath}: \n${errorsLog}`,
          pass: false,
        }
      }

      return {
        message: () => `OpenAPI validation successful for ${pactPath}`,
        pass: true,
      }
    } catch (error) {
      return {
        message: () => `Error while attempting to validate ${pactPath}: ${error.message}`,
        pass: false,
      }
    }
  },
})
