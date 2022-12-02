import data from './data.json'

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}


function handler(req, res) {
    const ret = [];
    const nextToken = req.query.nextToken || data[0].id;
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const firstIndex = data.findIndex(item => item.id === nextToken);
    for (let i = 0; i < count; ++i) {
        ret.push(data[(firstIndex + i) % data.length]);
    }
    const returnNextToken = data[(firstIndex + count) % data.length].id;
    res.status(200).json({data: ret, nextToken: returnNextToken})
}

module.exports = allowCors(handler)

