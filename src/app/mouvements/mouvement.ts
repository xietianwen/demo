export class Mouvement {
    Id: number;
    Name: string;
    Poids: number;
    Action?: string;

    public static fromJson(json: Object): Mouvement {
        return new Mouvement(
            json['Id'],
            json['Name'],
            json['Poids'],
            ( json['Action'] != null && json['Action'] !== undefined) ? json['Action'] : null
        );
    }

    constructor(id: number, name: string, poids: number, action?: string) {
        this.Id = id;
        this.Name = name;
        this.Poids = poids;
        this.Action = action;
    }
}
