let basicResponse = {
    "data": null,
    "code": null,
    "timestamp": null
}

const jsonCreate = (params) => {
    let temp = { ...basicResponse }
    temp.data = params
    temp.timestamp = new Date().getTime()

    return temp
}

export { jsonCreate }