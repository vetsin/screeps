import * as Roles from './roles';

export default function map_role(name: string) : any {
  let mrole = name.split("_")[0];
  if((Roles as any)[mrole]) {
    return (Roles as any)[mrole];
  }
  /*
  for(let role in Roles) {
    //if(role.toLowerCase() == 'mrole')
    //  return Roles.role;
    //console.log(role.toLowerCase());
    let x = Roles['x'];
  }
  */
  //console.log('map role technically failed');
  if (mrole == 'harvester')
    return Roles.Harvester;
  else if (mrole == 'conductor')
    return Roles.Conductor;
  else if (mrole == 'builder')
    return Roles.Builder;
  else if(mrole == 'upgrader')
    return Roles.Upgrader
  return undefined;
}
