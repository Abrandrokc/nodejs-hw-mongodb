import path from 'node:path';
export const rex = /^\+\d{12}$/
export const en = ['work', 'home', 'personal']
export const sortOrderList = ["asc", "desc"];
export const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000;
export const REFRESH_TOKEN_LIFETIME = 7 * 24 * 3600 * 1000;
export const contactListField = [

            "_id",
            "name",
            "phoneNumber",
            "email",
            "isFavourite",
            "contactType",
            "createdAt",
            "updatedAt"
]
export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
