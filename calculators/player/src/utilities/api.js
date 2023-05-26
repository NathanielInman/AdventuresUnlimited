const devDomain = 'http://localhost:5000';
const prodDomain = 'https://api.exploringthebleak.com';

export const domain = process.env.NODE_ENV === 'development' ? devDomain : prodDomain;
