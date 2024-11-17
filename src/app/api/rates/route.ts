import { NextResponse } from 'next/server'

export async function GET(_: Request) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const REPO_OWNER = 'nellu-art'
  const REPO_NAME = 'currency-converter-app'
  const FILE_PATH = 'src/db/data.json'
  const BRANCH = 'data-update'

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  })

  if (!response.ok) {
    return NextResponse.error()
  }

  const data = await response.json()

  return NextResponse.json({ data })
}
