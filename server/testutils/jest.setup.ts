/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { execSync } from 'child_process'
import path from 'path'
import { diffStringsUnified } from 'jest-diff'

export {}

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchStringIgnoringWhitespace(expected: string): R
      toMatchOpenAPISpec(): R
    }
  }
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
  toMatchOpenAPISpec(pactPath) {
    const openAPIUrl =
      'https://raw.githubusercontent.com/ministryofjustice/hmpps-approved-premises-api/4981eb92ef938eaab5b7acb2c571c59a6ea48f43/src/main/resources/static/codegen/built-cas2-api-spec.yml'

    const openAPIPath = path.join(__dirname, '..', '..', 'tmp', 'cas2-api.yml')

    try {
      execSync(`
        if [ ! -f ${openAPIPath} ]; then
          curl -s "${openAPIUrl}" | sed -E 's@/application@/cas2/application@g' | sed -E 's@/people@/cas2/people@g' > ${openAPIPath}
        fi
      `)

      execSync(`npx swagger-mock-validator ${openAPIPath} ${pactPath}`)
      return {
        message: () => `Swagger mock validator for ${pactPath} did not fail`,
        pass: true,
      }
    } catch (err) {
      return {
        message: () => err.output.toString(),
        pass: false,
      }
    }
  },
})
