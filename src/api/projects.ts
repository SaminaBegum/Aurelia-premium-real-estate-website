import {projects} from '@/data/projects';
export const getProjects=(market?:string)=>projects.filter(p=>!market||market==='All'||p.market===market);
export const getProject=(id:string)=>projects.find(p=>p.id===id);
