


function paginate(page, size) {
    if (!page || page <= 0) {
        page = 1
    }
    if (!size || size <= 0) {
        size = 100
    }

    const skip = (page - 1) * size

    return { limit: size, skip }
}


export default paginate