function ensureEndsWithColon(str) {
    if (str.includes(':')) {
        return str;  // Return the string as is if it contains a colon
    } else if (!str.endsWith(':')) {
        str += ':';
    }
    return str;
}