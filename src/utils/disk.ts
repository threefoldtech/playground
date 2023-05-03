import { v4 } from 'uuid'

export default class Disk{

  constructor(
    public id = v4(),
    public name = "DISK" + id.split("-")[0],
    public size = 50,
    public mountPoint = `/mnt/${id.split("-")[0]}`,
  ) {}
}