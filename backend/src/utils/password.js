import bcrypt from 'bcryptjs'

async function hashPassword(password) {
    const res = await bcrypt.hash(password,10);
    return res;
}

async function comparePassword(plain, hashPass){
    const res = await bcrypt.compare(plain,hashPass);
    return res;
}

export { hashPassword, comparePassword };