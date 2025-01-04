function changeDateFormat(isoDate) {
    const date = new Date(isoDate);
    const options = {
        year: 'numeric',
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, //12 hour format
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}

export { changeDateFormat };