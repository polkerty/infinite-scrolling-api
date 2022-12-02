import data from './data.json'

export default function handler(req, res) {
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
