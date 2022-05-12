const formatParsing = (data) => {
    const a = JSON.stringify(data);
    const b = JSON.parse(a);
    return b;
}
module.exports = formatParsing;