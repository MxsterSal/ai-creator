#!/bin/bash
TOKEN=$(cat /home/runner/workspace/.ghtoken | tr -d '\n')
git remote remove origin 2>/dev/null
git remote add origin https://MxsterSal:${TOKEN}@github.com/MxsterSal/ai-creator.git
git push -u origin main --force
echo "Done! Check github.com/MxsterSal/ai-creator"
