export function getCurrentPositionAsync(): Promise<Coordinates> {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition((position: Position) => {
            resolve(position.coords);
        });
    });
}