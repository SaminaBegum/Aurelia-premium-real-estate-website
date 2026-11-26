import type {Market} from './types';
// Map centre (approximate) for each project location. `n` = nearby places; falls back to the market default below.
export const NEAR_DEFAULT:Record<Market,string[]>={
  Pune:['Major IT parks – 15 min','Malls & dining – 15 min','Pune International Airport – 30 min','Pune Railway Station – 35 min','Hospitals & schools – 10 min'],
  Dubai:['Downtown Dubai – 20 min','The Dubai Mall – 20 min','Dubai International Airport – 25 min','Metro / major highway access – 10 min','Beaches & marinas – 25 min'],
};
export const GEO:Record<string,{c:[number,number];n?:string[]}>={
// ---- Pune ----
'Balewadi, Pune':{c:[18.5779,73.779],n:['Balewadi High Street – 5 min','Baner – 10 min','Hinjewadi IT Park – 20 min','Pune Railway Station – 30 min','Pune International Airport – 40 min']},
'Manjari Khurd, Pune':{c:[18.517,73.971],n:['EON IT Park, Kharadi – 15 min','Magarpatta City – 15 min','Pune International Airport – 25 min','Koregaon Park – 30 min','Pune Railway Station – 35 min']},
'Baner, Pune':{c:[18.559,73.7868],n:['Baner High Street – 5 min','Balewadi Sports Complex – 10 min','Aundh – 10 min','Hinjewadi IT Park – 25 min','Pune Railway Station – 30 min']},
'Sinhagad Road, Pune':{c:[18.48,73.82]},
'Wagholi, Pune':{c:[18.58,73.98]},
'Upper Kharadi, Pune':{c:[18.57,73.99]},
'Pimple Nilakh, Pune':{c:[18.59,73.785]},
'Punawale, Pune':{c:[18.625,73.75]},
'Mundhwa, Pune':{c:[18.533,73.932]},
'Tathawade, Pune':{c:[18.62,73.755]},
'Hadapsar, Pune':{c:[18.51,73.95]},
'Wakad, Pune':{c:[18.597,73.76]},
'Hinjewadi, Pune':{c:[18.58,73.727]},
'Shivajinagar, Pune':{c:[18.5308,73.8475]},
// ---- Dubai ----
'Jebel Ali, Dubai':{c:[25.0,54.99]},
'Business Bay, Dubai':{c:[25.185,55.272],n:['Burj Khalifa & The Dubai Mall – 5 min','Downtown Dubai – 5 min','DIFC – 8 min','Dubai International Airport – 15 min','Palm Jumeirah – 25 min']},
'MBR City, Dubai':{c:[25.17,55.31],n:['The Dubai Mall – 10 min','Downtown Dubai – 10 min','Business Bay – 10 min','Dubai International Airport – 20 min','Burj Al Arab – 25 min']},
'Meydan, Dubai':{c:[25.15,55.31]},
'Dubailand, Dubai':{c:[25.0,55.3],n:['Dubai Autodrome – 10 min','Global Village – 15 min','Downtown Dubai – 25 min','Mall of the Emirates – 25 min','Dubai International Airport – 30 min']},
'Dubai South, Dubai':{c:[24.9,55.16]},
'Dubai Harbour, Dubai':{c:[25.09,55.14]},
'Al Jaddaf, Dubai':{c:[25.21,55.33]},
'Dubai Maritime City, Dubai':{c:[25.27,55.27]},
'Dubai Creek Harbour':{c:[25.2,55.345],n:['Business Bay – 12 min','Downtown Dubai – 12 min','Dubai International Airport – 15 min','The Dubai Mall – 15 min','Palm Jumeirah – 35 min']},
'Marasi Bay, Dubai':{c:[25.195,55.27]},
'Sheikh Zayed Road, Dubai':{c:[25.213,55.27]},
'Al Sufouh, Dubai':{c:[25.11,55.17]},
'Downtown Jebel Ali, Dubai':{c:[25.0,55.04]},
};
