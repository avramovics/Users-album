
//Finde favorit users
export default (a, fun) => {
    let ret = { favorit: [], regular: [] };
      for (let i = 0; i < a.length; i++){
        if (fun(a[i])){
             ret.favorit.push( a[i] );
          }else{
              ret.regular.push( a[i] );
          }
      }        
      return ret;
  }