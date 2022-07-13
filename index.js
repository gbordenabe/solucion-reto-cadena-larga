const fs = require('fs')

const readFile = file => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err
    if (data.length === 0) return console.log('The file is empty')
    const firstDivision = data.split('\r\n')
    const table = []
    for (const str of firstDivision) {
      table.push(str.split(', '))
    }

    const n = table.length
    const m = table[0].length

    let maxLength = 0
    let maxLengthChar

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const res = []
        // Rows
        let h = j + 1
        while (h < m && table[i][j] === table[i][h]) {
          h++
        }
        res.push(h - j)
        // Columns
        let v = i + 1
        while (v < n && table[i][j] === table[v][j]) {
          v++
        }
        res.push(v - i)
        // Down Right Diagonal
        let d1 = i + 1
        let d2 = j + 1
        while (d1 < n && d2 < m && table[i][j] === table[d1][d2]) {
          d1++
          d2++
        }
        res.push(d1 - i)
        // Down Left Diagonal
        let d11 = i + 1
        let d22 = j - 1
        while (d11 < n && d22 >= 0 && table[i][j] === table[d11][d22]) {
          d11++
          d22--
        }
        res.push(d11 - i)

        const maxx = Math.max(...res)
        if (maxx > maxLength) {
          maxLength = maxx
          maxLengthChar = table[i][j]
        }
      }
    }

    const solution = []
    for (let x = 0; x < maxLength; x++) {
      solution.push(maxLengthChar)
    }
    console.log(solution.join(', '))
  })
}

readFile('./example.txt')
