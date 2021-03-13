const privateKey = "c10a34d6cdcddfa816b06309007a31db1effa1ea";
const publicKey = "b0ce62d9e80a25f88583fba90670b19c";

export function createHash(timeStamp) {
    const myHash = timeStamp + privateKey + publicKey;
    const hashMessage = md5(myHash);
    return hashMessage;
}