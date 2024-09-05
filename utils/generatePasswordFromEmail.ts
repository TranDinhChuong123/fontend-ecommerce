import crypto from 'crypto';

const generatePasswordFromEmail = (email: string) => {
    // Tạo mật khẩu từ email bằng cách hash MD5
    return crypto.createHash('md5').update(email).digest('hex').substring(0, 12); // Lấy 12 ký tự đầu
};

export default generatePasswordFromEmail;