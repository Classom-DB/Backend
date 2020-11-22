let basicResponse = {
    "data": null,
    "code": null,
    "timestamp": null
}

const jsonCreate = (params) => {
    let temp = { ...basicResponse }
    temp.data = params
    temp.timestamp = new Date().getTime()
    temp.code = 200
    return temp
}

export { jsonCreate }