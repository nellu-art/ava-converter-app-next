require('dotenv').config({ path: '.env.local' })
const fs = require('fs')

const SAVE_PATH = './src/constants/currencies.js'

const fetchFile = async () => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN

  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is required')
  }

  const REPO_OWNER = 'nellu-art'
  const REPO_NAME = 'currency-converter-app'
  const FILE_PATH = 'src/constants/currencies.js'

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch file')
  }

  const jsCode = await response.text()

  return jsCode
}

const writeContentToFile = (content) => {
  try {
    fs.writeFileSync(SAVE_PATH, content)
  } catch (error) {
    console.error('Failed to write file', error)
  }
}

const main = async () => {
  const result = await fetchFile()
  writeContentToFile(result)
}

main()
