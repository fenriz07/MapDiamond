import { CENTER_MAP } from "./conf";

export function Comunas() {

    return {
        1 : [
                {
                    id : 1,
                    name :  "Arica",
                    points : [
                        { lat : -18.45259904738144 , lng:-70.29266933285768,name:"Test1",phone:"741852",website:"https://google.com"},
                        { lat : -18.490148654973403, lng:-70.29744571644653,name:"Test2",phone:"741852",website:"https://google.com"},
                    ],
                    center : { lat : -18.476577063399176, lng:-70.31783530733459}                  
                },
                {
                    id : 2,
                    name :  "Camarones",
                },
                {
                    id : 3,
                    name :  "Putre",
                },
                {
                    id : 4,
                    name :  "General Lagos",
                },
                {
                    id : 5,
                    name :  "Arica",
                },
        ],
        2 : [
                {
                    id : 6,
                    name :  "Iquique",
                },
                {
                    id : 7,
                    name :  "Alto Hospicio",
                },
                {
                    id : 8,
                    name :  "Pozo Almonte",
                },
                {
                    id : 9,
                    name :  "Camiña",
                },
                {
                    id : 10,
                    name :  "Colchane",
                },
                {
                    id : 11,
                    name :  "Huara",
                },
                {
                    id : 12,
                    name :  "Pica",
                },
        ],
        14 : [
            {
                id:13,
                name :"Santiago Centro",
                points : [
                    { lat : -33.44732603999942 , lng:-70.65784434776982,name:"Test1",phone:"741852",website:"https://google.com"},
                    { lat : -33.44043389275519, lng:-70.66114824638738 ,name:"Test2",phone:"741852",website:"https://google.com"},
                ], 
                center : { lat : -33.4433631222408, lng:-70.65392096816144} 
            }
        ], 
    }
    
} 

export function getCenterComuna( idRegion, idComuna){

    let region = Comunas()[idRegion];
    let center = CENTER_MAP;

    region.forEach( comuna => {

        if( comuna.id == idComuna)
        {   if( "center" in comuna ){
                center = comuna.center;
            }            
        }
    });

    return center;
}


