export type ruApiResponseDto = {
  id: number;
  meal_type: string;
  campus: string;
  created_at: Date;
  date: string;
  main_dish_unrestricted: string;
  main_dish_vegetarian: string;
  main_dish_extra: string;
  garnish: string;
  accompaniment: string;
  salads: string;
  dessert: string;
  juice: string;
}[];
