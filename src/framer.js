const variants={
    in:{
      x:"100vw",
      opacity:0
    },
    animate:{
      x:0,
      opacity:1,
      transition:{duration:0.5}
 
    },
    exit:{
      x:"-100vw",
      opacity:0,

    },
  }
const trendingVehicles={
   animate:{
     scale:1
   }
}

const dashboardVariants={
  in:{
    y:"-100vh",
    opacity:0
  },
  animate:{
    y:0,
    opacity:1,
    transition:{
      duration:0.3,type:"spring",stiffness:100
    }
  },
  exit:{
    y:"100vh",
    opacity:0
  },
}
const purchaseHistoryspecificVariants={
  in:{},
  animate:{
    
  },
  exit:{}
}

export {trendingVehicles,dashboardVariants,purchaseHistoryspecificVariants};
export default variants