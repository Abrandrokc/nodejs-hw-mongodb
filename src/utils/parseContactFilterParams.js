import { en } from "../controllers/const.js";


const parseBoolean = value => {
    if(typeof value !== "string") return;

    if(!["true", "false"].includes(value)) return;

    return value === "true";
}

const parseContactsFitlerParams = ({type, favorite})=> {
    const parsedType = en.includes(type) ? type : null;
    const parsedFavorite = parseBoolean(favorite);

    return {
        type: parsedType,
        favorite: parsedFavorite,
    }
}

export default parseContactsFitlerParams;
