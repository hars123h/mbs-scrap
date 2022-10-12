const brands=[{
    brand:"Toyota"
},{
    brand:"Nissan"
},{
    brand:"Mazda"
},{
    brand:"Mitsubishi"
},{
    brand:"Honda"
},{
    brand:"Suzuki"
},{
    brand:"Subaru"
},{
    brand:"Isuzu"
},{
    brand:"Daihatsu"
},{
    brand:"Mitsuoka"
},{
    brand:"Alfaromeo"
},{
    brand:"Audi"
},{
    brand:"BMW"
},{
    brand:"Chrysler"
},{
    brand:"Citroen"
},{
    brand:"Fiat"
},{
    brand:"Lexus"
},{
    brand:"Hino"
},{
    brand:"Nissan Diesel"
},{
    brand:"Mitsubishi Fuso"
},{
    brand:"AMG"
},{
    brand:"Yes!"
},{
    brand:"Opel"
},{
    brand:"Smart"
},{
    brand:"Volkswagen"
},{
    brand:"Brabus"
},{
    brand:"Mercedes-Benz"
},{
    brand:"Porsce"
},{
    brand:"Mayback"
},{
    brand:"Ruf"
},{
    brand:"Mini"
},{
    brand:"Saab"
},{
    brand:"Volvo"
},{
    brand:"Citoren"
},{
    brand:"Peugeot"
},{
    brand:"Renault"
},{
    brand:"AMC"
},{
    brand:"GMC"
}]
brands.sort((a,b) => (a.brand > b.brand) ? 1 : ((b.brand > a.brand) ? -1 : 0))
// "AMC", "GMC", "WINNEBAGO", "OLDSMOBILE", "CADILLAC", "CHRYSLER", "SATURN", "SALEEN", "CHEVROLET", "DODGE", "HUMMER",
// "BUICK", "FORD", "PLYMOUTH", "PONTIAC", "MERCURY", "LINCOLN", "JEEP", "BL", "MG", "TVR", "ASTONMARTIN", "WOLSELEY",
// "WESTFIELD", "AUSTIN", "CATERHAM", "JAGUAR", "DAIMLER", "TRIUMPH", "VANDEN PLAS", "PANTHER", "HEALEY", "BENTLEY", "MARCOS",
// "MORGAN", "MORRIS", "RILEY", "LAND ROVER", "LOTUS", "ROVER", "ROLLS-ROYCE", "BIRKIN", "AUTOBIANCHI", "ALFA ROMEO", "INNOCENTI",
// "DETOMASO", "FIAT", "FERRARI", "BUGATTI", "MASERATI", "LANCIA", "LAMBORGHINI", "DONKERVOORT", "GM DEW", "GM MATIZ", "KIA",
// "SSANG YONG", "HYUNDAI", "LADA", "TD", "REVERSE IMPORTED", "OTHERS"

// const range=[{
//     Any 660cc or less 661~1000cc 1001-1300cc 1301-1500cc 1501-1800cc 1801-2000cc 2001~2500cc 2501-3000cc 3001~3500cc 3501~4000cc 4001~4500cc over 4501cc
// }]


const rangeEngine=[{min:0,max:600},
{min:601,max:1000},
{min:1001,max:1300},
{min:1301,max:1500},
{min:1501,max:1800},
{min:1801,max:2000},
{min:2001,max:2500},
{min:2501,max:3000},
{min:3001,max:3500},
{min:3501,max:4000},
{min:4001,max:4500},
{min:4501,max:1000000},
]

const rangeOdo=[1000,5000,10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,150000,200000,250000,300000]
const rangeOdo2=[1000,5000,10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,150000,200000,250000,300000]

const year1 = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1972, 1971, 1968, 1967, 1960, 1955, 1953, 1952, 1951, 1935, 1932]
const year2 = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1972, 1971, 1968, 1967, 1960, 1955, 1953, 1952, 1951, 1935, 1932]

export {brands,rangeEngine,rangeOdo,rangeOdo2,year1,year2}