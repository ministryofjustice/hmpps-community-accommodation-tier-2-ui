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
      'https://raw.githubusercontent.com/ministryofjustice/hmpps-approved-premises-api/main/src/main/resources/static/codegen/built-cas2-api-spec.yml'

    const openAPIPath = path.join(__dirname, '..', '..', 'tmp', 'cas2-api.yml')

    try {
      execSync(`
        if [ ! -f ${openAPIPath} ]; then
          curl -s "${openAPIUrl}" |
          sed -E 's@/applications@/cas2/applications@g' |
          sed -E 's@/submissions@/cas2/submissions@g' |
          sed -E 's@/assessments@/cas2/assessments@g' |
          sed -E 's@/people@/cas2/people@g' |
          sed -E 's@/reports@/cas2/reports@g' |
          sed -E 's@/reference-data/@/cas2/reference-data/@g' > ${openAPIPath}
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
