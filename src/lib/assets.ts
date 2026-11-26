// Resolves image file names (e.g. "p1.jpg") to bundled URLs from src/assets/images.
const files=import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,svg}',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
export const A=(name:string|null|undefined):string=>!name?'':/^(https?:)?\/\//.test(name)?name:(files[`../assets/images/${name}`]||'');
