import elektronik from "../assets/services/elektronik.jpg";
import kebersihan from "../assets/services/kebersihan.jpg";
import builder from "../assets/services/builder.jpg";
import bangunan from "../assets/services/bangunan.jpg";
import teknologi from "../assets/services/teknologi.jpg";
import transportasi from "../assets/services/transportasi.jpg";
import desain from "../assets/services/desain.jpg";
import lainnya from "../assets/services/lainnya.jpg";

export const getCategoryImage=(kategori)=>{
    switch(kategori){
        case "Elektronik":
            return elektronik;

        case "Kebersihan":
            return kebersihan;

        case "Builder":
            return builder;

        case "Bangunan":
            return bangunan;

        case "Teknologi":
            return teknologi;

        case "Transportasi":
            return transportasi;

        case "Desain":
            return desain;

        default:
            return lainnya;
    }
};
