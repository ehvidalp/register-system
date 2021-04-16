export interface VisitorGroup {
  Id?: number;
  Agency: string;
  Guide: string;
  Locals: number;
  Students: number;
  Nationals: number;
  Foreigns: number;
  InsidePark?: boolean
  Exit?: string;
  UserId: number;
  CreatedAt: Date
}
