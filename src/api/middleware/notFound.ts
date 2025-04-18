// eslint-disable-next-line @typescript-eslint/no-unused-vars
function notFound(req, res, next) {
    res.status(404)
    res.json({
        message: "ештеңе табылмады",
    })
}

export default notFound
