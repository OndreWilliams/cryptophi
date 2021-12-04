
// Definition for custom error to send on db/server failure >
export class StatusError extends Error {
  constructor(public status: number, public title: string,  message?: string){
    super(message);
  }
}
