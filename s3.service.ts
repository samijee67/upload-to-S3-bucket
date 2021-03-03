import { get } from "./utils.service";


export const getS3Url = async type => {
    const res = await get(`/s3/bucket/url?type=${type}`);
    return await res.json();
};
