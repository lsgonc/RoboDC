export type EventResponseDto = {
  Titulo: string;
  Data: Date;
  Descricao: string;
  Local: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
  id: string;
};

export type EventsGroupedByDay = {
  [key: string]: EventResponseDto[];
};
