# Initial API

Suggested usage for api validation is using this repo as manual [subtree] [medium-post].

## Market

- GET   /v1/markets/?{search-query}
- GET   /v1/markets/:id

- PATCH /v1/markets/list
- PATCH /v1/markets/

- POST  /v1/markets/list
- POST  /v1/markets

## Farm

- GET   /v1/farms/?{search-query}
- GET   /v1/farms/:id

- PATCH /v1/farms/list
- PATCH /v1/farms/

- POST  /v1/farms/list
- POST  /v1/farms

# Subtree routine

## Getting an update from the subtree’s remote

?This should create `schemas` subfolder?

- `git fetch schemas`
- `git merge -s subtree --squash schemas/master`
- Or `git merge -X subtree=schemas --squash schemas/master` if things went [wrong][offical-docs].
- `git commit -m "Updated schemas from subtree"`


## Updating a subtree in-place in the container

- `git checkout (-b) schemas (schemas/master)`
- `git cherry-pick -x (whatever)`
- `git cherry-pick -x --strategy=subtree master^`
- `git push`

[offical-docs]: https://www.kernel.org/pub/software/scm/git/docs/howto/using-merge-subtree.html
[medium-post]: https://medium.com/@porteneuve/mastering-git-subtrees-943d29a798ec#.mplu0dq3y
