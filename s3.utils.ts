import { getS3Url } from "../services/s3.service";


export const uploadFile = async (file): Promise<string> => {
    let type = file.type;
    const { url } = await getS3Url(type);

    const headersContent = {
        "Content-Type": file.type,
        Accept: "application/json"
    };
    const headers = new Headers(headersContent);
    const response = await fetch(
        new Request(url, {
            method: "PUT",
            body: file,
            headers
        })
    );
    if (!response) return null;
    let resUrl = new URL(response?.url);
    return resUrl.protocol + resUrl.host + resUrl.pathname;
};
