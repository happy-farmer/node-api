> Schemas for API, Database and everything that can be validated.

## API

Search for appropriate schemas (`get.json`, `patch.json`, `post.json` etc.) in request/response folders

### Market

- POST  /v1/markets
- GET   /v1/markets

- GET   /v1/markets/:id
- PATCH /v1/markets/:id
- DELETE /v1/markets/:id

- POST  /v1/markets/list


### Farm

- POST  /v1/farms
- GET   /v1/farms

- GET   /v1/farms/:id
- PATCH /v1/farms/:id
- DELETE /v1/farms/:id

- POST  /v1/farms/list


# Subtree routine

Use this repo as manual [subtree][medium-post].

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
