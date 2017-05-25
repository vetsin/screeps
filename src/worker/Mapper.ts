import * as Roles from './roles';

export default function map_role(name: string) : any | undefined {
  let mrole = name.split("_")[0];

  for(let role in Roles) {
    if(role.toLowerCase() == mrole) {
      return (Roles as any)[role]
    }
  }

  return undefined;
}
