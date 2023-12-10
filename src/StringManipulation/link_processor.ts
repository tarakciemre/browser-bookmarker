const urlMatch = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_~#?&//=]*)$/;

export function processString(input: string) {
    if(input.match(urlMatch)) {
        // Check if it starts with http:// or https://, if not, prepend https://
        return input.startsWith('http://') || input.startsWith('https://') ? input : 'https://' + input;
    } else {
        const baseUrl = "https://www.google.com/search?q=";
        const formattedQuery = input.split(' ').join('+');
        return baseUrl + encodeURIComponent(formattedQuery);
    }
}
