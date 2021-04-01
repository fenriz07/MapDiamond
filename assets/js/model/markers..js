import { Comunas } from "./comuna";

export function getMarkers() {
    let markers = [];

    Object.keys( Comunas() ).forEach( key => {
        Comunas()[key].forEach( comuna => {
            if( "points" in comuna ){
                comuna.points.forEach( marker => {
                    markers.push(marker);
                })
            }
        });
    })

    return markers;
}