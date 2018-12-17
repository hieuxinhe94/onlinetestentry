export class Subject {
    id: number;
    name: string;
    title: string;
    timeUpMinutes: number;
    imgAvatar: string;
    description: string;

    /**
     *
     */
    constructor(data: any) {
      data = data || {};
      this.id = data.id;
      this.name = data.name;
      this.title = data.title;
      this.imgAvatar = data.imgAvatar;
      this.timeUpMinutes = data.timeUpMinutes;
      this.description = data.description;
    }
}
