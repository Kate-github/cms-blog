module.exports = {
    format_date: date => {
        if (date) {
            return date.toLocaleString();
        }

        return 'N/A';
    }
}
