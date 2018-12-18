export class Mouvement {
    id: number;
    name: string;
    poids: number;
    action?: string;
    offlineId?: number;

    public static fromJson(json: Object): Mouvement {
        return new Mouvement(
            json['id'],
            json['name'],
            json['poids'],
            ( json['action'] != null && json['action'] !== undefined) ? json['action'] : null,
            ( json['offlineId'] != null && json['offlineId'] !== undefined) ? json['offlineId'] : null
        );
    }

    constructor(id: number, name: string, poids: number, action?: string, offlineId?: number) {
        this.id = id;
        this.name = name;
        this.poids = poids;
        this.action = action;
        this.offlineId = offlineId;
    }
}
