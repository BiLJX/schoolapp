export function compareObject<O1, O2>(obj1: O1, obj2: O2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}