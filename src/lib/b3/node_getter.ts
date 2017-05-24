var nodes : any = {};

export default class NodeGetter {

  public static get(id: string) {
    if(nodes[id])
      return nodes[id];
    throw new Error('no node found with id ' + id);
  }

  public static set(id: string, node: any) {
    if(nodes[id])
      throw new Error('node already exists with id ' + id);
    nodes[id] = node;
  }

}
