#!/usr/bin/env bash
# One-shot: point git at scripts/git-hooks/ so hooks work across clones.
set -e
git config core.hooksPath scripts/git-hooks
echo "git hooks installed from scripts/git-hooks/"
