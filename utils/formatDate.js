function formatDate (date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    date = date.toLocaleDateString("en-US", options);
    return date;
}

module.exports = formatDate;