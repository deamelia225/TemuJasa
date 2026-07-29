import cleaningService from"../assets/services/cleaning-service.png";
import serviceAc from"../assets/services/service-ac.png";
import serviceLaptop from"../assets/services/service-laptop.png";
import tukangBangunan from"../assets/services/tukang-bangunan.png";
import tukangListrik from"../assets/services/tukang-listrik.png";
import plumbing from"../assets/services/plumbing.png";
import pindahan from"../assets/services/pindahan.png";
import catRumah from"../assets/services/cat-rumah.png";
function getServiceImage(kategori){
    switch(kategori){
        case"Cleaning Service":
            return cleaningService;
        case"Service AC":
            return serviceAc;
        case"Service Laptop":
            return serviceLaptop;
        case"Tukang Bangunan":
            return tukangBangunan;
        case"Tukang Listrik":
            return tukangListrik;
        case"Plumbing":
            return plumbing;
        case"Pindahan":
            return pindahan;
        case"Cat Rumah":
            return catRumah;
        default:
            return cleaningService;
    }
}
export default getServiceImage;