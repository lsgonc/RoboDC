export type RuApiResponseDto = {
  id: number;
  meal_type: string;
  campus: string;
  created_at: string;
  date: string;
  main_dish_unrestricted: string;
  main_dish_vegetarian: string;
  main_dish_extra: string;
  garnish: string;
  accompaniment: string;
  salads: string;
  dessert: string;
  juice: string;
};

export type DayMenu = {
  date: string;
  lunch?: RuApiResponseDto;
  dinner?: RuApiResponseDto;
  isActive: boolean;
};
