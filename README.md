# cicd-lab

A sandbox for learning and practising CI/CD. Nothing here is production. Break it freely.

The app is a tiny Express + TypeScript service in the same shape as the LoRa backend, so what you learn here transfers:

- `GET /health` → `{ ok, version }` (version comes from `APP_VERSION`)
- `GET /add?a=2&b=3` → `{ result: 5 }`

```
npm ci             # install exactly what the lockfile says (what CI does)
npm run typecheck  # tsc --noEmit
npm test           # jest: 5 tests, one of them deliberately non-hermetic
npm run build && APP_VERSION=0.1.0 npm start
```

## The ladder

Each step is one commit (later, one PR) that **you** make. The notes in `LESSONS.md` are filled in as you go.

1. **First workflow.** Create `.github/workflows/ci.yml` that runs `npm ci`, `npm run typecheck`, `npm test` on every push. Watch it go red. Read the log. Find out *why* it is red before changing anything.
2. **Hermetic tests.** Fix the red without deleting the test. Two ways exist; know both.
3. **Speed.** Cache `node_modules`, add `concurrency` so a new push cancels the old run, add `timeout-minutes`.
4. **PRs and protection.** Work on a branch, open a PR, require the check to pass before merge. Break a test on the branch and watch the merge button lock.
5. **Build artifact.** Add a `build` job that produces `dist/` and uploads it; download it in a later job. This is the "build once, deploy the same bytes" principle.
6. **CD.** A `deploy` job that runs only after tests pass and only on `main`. First target: a mock deploy (a script that prints what it would do). Then a real one (Railway or Fly free tier), with the URL and a smoke check of `/health` after deploy.
7. **Secrets and environments.** `secrets.` vs `vars.`; a `production` environment with a required reviewer; rotate a secret and prove the old one no longer works.
8. **Docker.** Build the image in CI, tag it with the commit SHA, push to GHCR, deploy that tag.
9. **Rollback drill.** Ship a bad commit on purpose. Time how long it takes you to notice and roll back. Then automate the notice (smoke check failing → job red).

## Already learned, before the first commit

`npm install typescript` pulled TypeScript 7.0 (the new native compiler), and `ts-jest` cannot drive it. Pinned to `typescript@5`.
That is what an unpinned dependency does to a pipeline on a random Tuesday, and why CI runs `npm ci` from the lockfile, never `npm install`.
