export interface Interaction {
    type: "merit"|"demerit",
    reason: string,
    given_by: string,
    given_to: string,
    amount: number,
    given_on: Date
}

export interface ClientInteractionData {
    type: "merit"|"demerit",
    reason: string,
    given_to: string
}