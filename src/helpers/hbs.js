module.exports = {
    dateFormat : (data) => {
        const a = new Date(data)
       return  a.toLocaleDateString()
    }
}