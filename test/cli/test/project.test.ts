import { expect, test } from 'vitest'
import { runVitest } from '../../test-utils'

test.each([
  { pattern: 'project_1', expected: ['project_1'] },
  { pattern: '*', expected: ['project_1', 'project_2', 'space_1'] },
  { pattern: '*j*', expected: ['project_1', 'project_2'] },
  { pattern: 'project*', expected: ['project_1', 'project_2'] },
  { pattern: 'space*', expected: ['space_1'] },
])('should match projects correctly: $pattern', async ({ pattern, expected }) => {
  const { stdout, stderr } = await runVitest({
    root: 'fixtures/project',
    reporters: ['basic'],
    project: pattern,
  })

  expect(stderr).toBeFalsy()
  expect(stdout).toBeTruthy()

  expected.forEach(name => expect(stdout).toContain(name))
})
