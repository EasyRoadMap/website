export const validate = (email) => {
    const EMAIL_REGEXP = /^[_A-Za-z0-9-+]+(?:\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9]+)*\.[A-Za-z]{2,}$/gm;
    return EMAIL_REGEXP.test(email);
}