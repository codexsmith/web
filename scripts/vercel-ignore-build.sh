#!/bin/sh
set -eu

build_inputs="src public scripts package.json package-lock.json next.config.ts postcss.config.mjs tsconfig.json vercel.json"

if [ -n "${VERCEL_GIT_PREVIOUS_SHA:-}" ] && git cat-file -e "${VERCEL_GIT_PREVIOUS_SHA}^{commit}" 2>/dev/null; then
  git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" HEAD -- $build_inputs
  exit $?
fi

git diff --quiet HEAD^ HEAD -- $build_inputs
