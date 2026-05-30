import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    // Only run the repo's own test suite. `.claude/worktrees/` holds
    // orphaned git worktrees from past agent-isolation runs, each with
    // a full copy of test/ — without this scoping, vitest traverses all
    // of them and runs the suite 7× over stale code (= misleading pass
    // counts + slow runs).
    include: ['test/**/*.{test,spec}.ts'],
    exclude: ['node_modules/**', '.claude/**', 'dev/**'],
  },
});
