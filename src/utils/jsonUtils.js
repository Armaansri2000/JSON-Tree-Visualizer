export function parseJsonSafe(text){
  try{
    const v = JSON.parse(text)
    return {value: v, error: null}
  }catch(err){
    return {value: null, error: err}
  }
}
