export class Mouvement {
    id: number;
    name: string;
    poids: number;
    action?: string;

    public static fromJson(json: Object): Mouvement {
        return new Mouvement(
            json['id'],
            json['name'],
            json['poids'],
            ( json['action'] != null && json['action'] !== undefined) ? json['action'] : null
        );
    }

    constructor(id: number, name: string, poids: number, action?: string) {
        this.id = id;
        this.name = name;
        this.poids = poids;
        this.action = action;
    }
}
